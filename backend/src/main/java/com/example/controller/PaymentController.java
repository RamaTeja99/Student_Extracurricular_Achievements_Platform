package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
   @Autowired
   private final PaymentService paymentService;

   public PaymentController(PaymentService paymentService) {
       this.paymentService = paymentService;
   }

   @PostMapping("/create-order/{collegeId}")
   public ResponseEntity<?> createOrder(@PathVariable Long collegeId, @RequestParam double amount) {
       try {
           String order = paymentService.createOrder(collegeId, amount);
           return ResponseEntity.ok(order);
       } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
       }
   }

   @PostMapping("/success")
   public ResponseEntity<?> handlePaymentSuccess(
           @RequestParam String razorpayOrderId,
           @RequestParam String razorpayPaymentId,
           @RequestParam String razorpaySignature) {
       try {
           paymentService.handlePaymentSuccess(razorpayOrderId, razorpayPaymentId, razorpaySignature);
           return ResponseEntity.ok("Payment verified and premium status updated.");
       } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
       }
   }
}
