import React, { useRef, useState } from "react";
import "../../assets/css/privacy.css";
import logo from "../../assets/images/logo.svg";


const PrivacyPolicy = () => {

    const [scrollTopVal, setScrollTopVal] = useState(0);
    const [showGoTopOn, setShowGoTopOn] = useState(500);
    const privacyCanvasRef = useRef();

    const scrollValue = (e) => {
        setScrollTopVal(e.target.scrollTop);
    } 

    const goToTop = () => {
        privacyCanvasRef.current.scrollTo(0, 0);
    }
    

    return (
        <div className="privacyContainerOuter" onScroll={scrollValue} ref={privacyCanvasRef}>
            { scrollTopVal > showGoTopOn ? <button type="button" className="goToTop" onClick={goToTop}></button> : "" }
            <div className="privacyContainer">
                <div className="privacyContainerHead">
                    <img src={logo} alt="Red Belt Gym" />
                </div>
                <h1>
                    Privacy Policy
                </h1>
                <p>
                    This privacy policy has been compiled to better serve those who are concerned with how their 'Personally Identifiable Information' (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.
                </p>
                <h2>
                    What personal information do we collect from the people that visit our blog, website or app?
                </h2>
                <p>
                    When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, phone number or other details to help you with your experience.
                </p>
                <h2>
                    When do we collect information?
                </h2>
                <p>
                    We collect information from you when you register on our site, fill out a form or enter information on our site.
                </p>
                <h2>
                    How do we use your information?
                </h2>
                <p>
                    We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:
                    <ul>
                        <li>To administer a contest, promotion, survey or other site feature.</li>
                        <li>To follow up with them after correspondence (live chat, email or phone inquiries)</li>
                    </ul>
                </p>
                <h2>
                    How do we protect your information?
                </h2>
                <p>
                    We do not use vulnerability scanning and/or scanning to PCI standards.
                </p>
                <p>
                    We only provide articles and information.
                </p>
                <p>
                    We use regular Malware Scanning.
                </p>
                <p>
                    Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.
                </p>
                <p>
                    We implement a variety of security measures when a user places an order enters, submits, or accesses their information to maintain the safety of your personal information.
                </p>
                <p>
                    All transactions are processed through a gateway provider and are not stored or processed on our servers.
                </p>
                <h2>
                    Do we use 'cookies'?
                </h2>
                <p>
                    We do not use cookies for tracking purposes.
                </p>
                <p>
                    You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since the browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.
                </p>
                <p>
                    If you turn cookies off, Some of the features that make your site experience more efficient may not function properly. That make your site experience more efficient and may not function properly.
                </p>
                <h2>
                    Third-party disclosure
                </h2>
                <p>
                    We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when it's release is appropriate to comply with the law, enforce our site policies, or protect our or others' rights, property or safety.
                </p>
                <p>
                    However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.
                </p>
                <h2>
                    Third-party links
                </h2>
                <p>
                    We do not include or offer third-party products or services on our website.
                </p>
                <p>
                    Google
                </p>
                <p>
                    Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users.
                </p>
                <p>
                    <a href="https://support.google.com/adwordspolicy/answer/1316548?hl=en" target="_blank">
                        https://support.google.com/adwordspolicy/answer/1316548?hl=en
                    </a>
                </p>
                <p>
                    We have not enabled Google AdSense on our site but we may do so in the future.
                </p>
                <h2>
                    California Online Privacy Protection Act
                </h2>
                <p>
                    CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law's reach stretches well beyond California to require any person or company in the United States (and conceivably the world) that operates websites collecting Personally Identifiable Information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals or companies with whom it is being shared. - See more at: <a href="http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf" target="_blank">http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf</a>
                </p>
                <h2>
                    According to CalOPPA, we agree to the following:
                </h2>
                <p>
                    Users can visit our site anonymously.
                </p>
                <p>
                    Once this privacy policy is created, we will add a link to it on our home page or as a minimum, on the first significant page after entering our website.<br />
                    Our Privacy Policy link includes the word 'Privacy' and can easily be found on the page specified above.
                </p>
                <p>
                    You will be notified of any Privacy Policy changes:
                    <ul>
                        <li>On our Privacy Policy Page</li>
                    </ul>
                </p>
                <p>
                    Can change your personal information:
                    <ul>
                        <li>By emailing us</li>
                        <li>By calling us</li>
                        <li>By logging in to your account</li>
                    </ul>
                </p>
                <h2>
                    How does our site handle Do Not Track signals?
                </h2>
                <p>
                    We honour Do Not Track signals and Do Not Track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place.
                </p>
                <h2>
                    Does our site allow third-party behavioural tracking?
                </h2>
                <p>
                    It's also important to note that we allow third-party behavioural tracking.
                </p>
                <h2>
                    COPPA (Children Online Privacy Protection Act)
                </h2>
                <p>
                    When it comes to the collection of personal information from children under the age of 13 years old, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, and the United States consumer protection agency, enforce the COPPA Rule, which spells out what operators of websites and online services must do to protect children's privacy and safety online.
                </p>
                <p>
                    We do not specifically market to children under the age of 13 years old.
                </p>
                <h2>
                    Fair Information Practices
                </h2>
                <p>
                    The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.
                </p>
                <p>
                    In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:<br />
                    We will notify you via email:
                    <ul>
                        <li>Within 7 business days</li>
                    </ul>
                </p>
                <p>
                    We also agree to the Individual Redress Principle which requires that individuals have the right to legally pursue enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and/or prosecute non-compliance by data processors.
                </p>
                <h2>
                    CAN SPAM Act
                </h2>
                <p>
                    The CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial messages, gives recipients the right to have emails stopped from being sent to them, and spells out tough penalties for violations.
                </p>
                <p>
                    We collect your email address in order to:
                    <ul>
                        <li>Send information, respond to inquiries, and/or other requests or questions</li>
                        <li>Process orders and send information and updates pertaining to orders.</li>
                        <li>Send you additional information related to your product and/or service</li>
                        <li>Market to our mailing list or continue to send emails to our clients after the original transaction has occurred.</li>
                    </ul>
                </p>
                <h2>
                    To be in accordance with CANSPAM, we agree to the following:
                </h2>
                <p>
                    <ul>
                        <li>Do Not use false or misleading subjects or email addresses.</li>
                        <li>Identify the message as an advertisement in some reasonable way.</li>
                        <li>Include the physical address of our business or site headquarters.</li>
                        <li>Monitor third-party email marketing services for compliance, if one is used.</li>
                        <li>Honor opt-out/unsubscribe requests quickly.</li>
                        <li>Allow users to unsubscribe by using the link at the bottom of each email.</li>
                    </ul>
                </p>
                <p>
                    If at any time you would like to unsubscribe from receiving future emails, you can email us at
                    <ul>
                        <li>Follow the instructions at the bottom of each email.</li>
                    </ul>
                </p>
                <p>
                    And we will promptly remove you from ALL correspondence.
                </p>
                <h2>
                    Contact Us
                </h2>
                <p>
                    If there are any questions regarding this privacy policy, you may contact us using the information below.
                </p>
                <p>
                    <a href="https://redbeltgym.com/" target="_blank">https://redbeltgym.com/</a><br />
                    7827 Pecan Dr.<br />
                    Beaumont, Texas 77713<br />
                    rbgsupport@redbeltsoftware.com<br />
                    409-554-0045
                </p>
                <p>Last Edited on 2023-03-22</p>
            </div>
        </div>
    )
}

export default PrivacyPolicy;