import { useEffect, useCallback } from 'react';
import jsPDF from 'jspdf';
import './CertificateGenerator.css';
import certificateImage from './image.png'; 

const CertificateGenerator = ({ achievement, onComplete }) => {
    const generateCertificate = useCallback(() => {
        try {
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4',
            });

            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;

            // Outer Decorative Border
            doc.setDrawColor(210, 210, 210); // Light gray
            doc.setLineWidth(0.5);
            doc.rect(1, 1, pageWidth-3, pageHeight-3);

            // Inner Decorative Border
            doc.setDrawColor(230, 120, 0); // Orange-like for inner border
            doc.setLineWidth(0.7);
            doc.rect(3, 3, pageWidth-7, pageHeight-7);

            // Add square corners
            doc.setDrawColor(210, 210, 210); // Light gray
            doc.setLineWidth(1);
            doc.rect(1, 1, 1, 1); // Top left corner
            doc.rect(pageWidth-3, 1, 1, 1); // Top right corner
            doc.rect(1, pageHeight-3, 1, 1); // Bottom left corner
            doc.rect(pageWidth-3, pageHeight - 3, 1, 1); // Bottom right corner

            // Fill main content area
            doc.addImage(certificateImage, 'PNG', 5, 5, pageWidth - 11, pageHeight - 11, '', 'FAST');

            // Title
            doc.setFontSize(26);
            doc.setFont('roman','bold');
            doc.text('CERTIFICATE OF ACHIEVEMENT', (pageWidth / 2), 65, { align: 'center' });
            doc.setFontSize(15);
            doc.setFont('normal','normal');
            doc.text('Proudly presents to:', (pageWidth / 2), 77, { align: 'center' });

            // Student Name
            doc.setFontSize(50);
            doc.setFont('normal','bold');
            doc.text(achievement.student.name, pageWidth / 2, 105, { align: 'center' });

            
            
             // Achievement Type
             let certificateType = 'Participation';
             if (achievement.firstPosition) certificateType = 'First Position';
             else if (achievement.secondPosition) certificateType = 'Second Position';
             else if (achievement.thirdPosition) certificateType = 'Third Position';
             // Achievement Details
             doc.setFontSize(12);
             doc.setFont('normal','normal');
             doc.text(
                `This certificate is awarded for the successful completion of ${achievement.activityName} Activity on ${new Date(achievement.activityDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}.`,
                pageWidth / 2,
                125,
                { align: 'center' }
            );
            doc.text(
                `The accomplishment demonstrated in this activity was ${achievement.activityDescription}`,
                pageWidth / 2,
                135,
                { align: 'center' }
            );
            doc.text(
                `This certificate, awarded for ${certificateType} recognition, acknowledges the continuous dedication to excellence.`,
                pageWidth / 2,
                130,
                { align: 'center' }
            );
            doc.text(
                `It also acknowledges their significant contributions to ${achievement.activityCategory} Activities at ${achievement.student.college.name}.`,
                pageWidth / 2,
                140,
                { align: 'center' }
            );
            
            
            
            

            // Save PDF
            const fileName = `${achievement.student.name}_${achievement.activityName.replace(/\s+/g, '_')}_Certificate.pdf`;
            doc.save(fileName);

            if (onComplete) {
                setTimeout(onComplete, 100);
            }
        } catch (error) {
            console.error('Error generating certificate:', error);
            if (onComplete) {
                onComplete();
            }
        }
    }, [achievement,  onComplete]);


    useEffect(() => {
        if (achievement) {
            const timeoutId = setTimeout(generateCertificate, 100); // Delay the generation to ensure the logo is loaded
            return () => clearTimeout(timeoutId);
        }
    }, [achievement, generateCertificate]);

    return null;
};

export default CertificateGenerator;
