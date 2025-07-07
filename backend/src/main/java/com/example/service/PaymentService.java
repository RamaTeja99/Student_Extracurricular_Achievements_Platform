package com.example.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.entity.College;
import com.example.entity.PaymentOrder;
import com.example.repository.CollegeRepository;
import com.example.repository.OrderRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;

@Service
public class PaymentService {

   @Value("${razorpay.key}")
   private String razorpayKey;

   @Value("${razorpay.secret}")
   private String razorpaySecret;

   private final OrderRepository orderRepository;
   private final CollegeRepository collegeRepository;

   public PaymentService(OrderRepository orderRepository, CollegeRepository collegeRepository) {
       this.orderRepository = orderRepository;
       this.collegeRepository = collegeRepository;
   }

   public String createOrder(Long collegeId, double amount) throws Exception {
       RazorpayClient razorpay = new RazorpayClient(razorpayKey, razorpaySecret);
       JSONObject orderRequest = new JSONObject();
       orderRequest.put("amount", (int) (amount)); // Amount in paise
       orderRequest.put("currency", "INR");
       orderRequest.put("receipt", "order_rcpt_" + collegeId);
       Order razorpayOrder = razorpay.orders.create(orderRequest);
       // Save to DB
       PaymentOrder paymentOrder = new PaymentOrder();
       paymentOrder.setRazorpayOrderId(razorpayOrder.get("id"));
       paymentOrder.setCollegeId(collegeId);
       paymentOrder.setPaid(false);
       orderRepository.save(paymentOrder);

       return razorpayOrder.toString();
   }

   public void handlePaymentSuccess(String orderId, String paymentId, String signature) throws Exception {
       PaymentOrder paymentOrder = orderRepository.findByRazorpayOrderId(orderId)
               .orElseThrow(() -> new Exception("Order not found"));

       // Verify signature
       JSONObject options = new JSONObject();
       options.put("razorpay_order_id", orderId);
       options.put("razorpay_payment_id", paymentId);
       options.put("razorpay_signature", signature);

       boolean isSignatureValid = Utils.verifyPaymentSignature(options, razorpaySecret);
       if (isSignatureValid) {
           paymentOrder.setRazorpayPaymentId(paymentId);
           paymentOrder.setRazorpaySignature(signature);
           paymentOrder.setPaid(true);
           orderRepository.save(paymentOrder);

           // Update College as Premium
           College college = collegeRepository.findById(paymentOrder.getCollegeId())
                   .orElseThrow(() -> new Exception("College not found"));
           college.setPremium(true);
           collegeRepository.save(college);
       } else {
           throw new Exception("Invalid payment signature");
       }
   }
}
