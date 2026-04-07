import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Shield, ScrollText, AlertTriangle, Scale, UserCheck, ShieldAlert, CreditCard, Ban, Share2, Globe, Database, FileText, HelpCircle, UserPlus, } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const LegalSection = ({ id, title, icon: Icon, children }: { id: string; title: string; icon: any; children: React.ReactNode }) => (
  <div id={id} className="legal-section glass-panel p-8 rounded-3xl mb-8 border border-white/5 hover:border-white/10 transition-colors">
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-white/5 rounded-2xl">
        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-bold gradient-text">{title}</h2>
    </div>
    <div className="text-slate-400 leading-relaxed space-y-4 text-sm md:text-base">
      {children}
    </div>
  </div>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="block py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors border-l-2 border-transparent hover:border-white pl-4"
  >
    {children}
  </a>
);

export default function ConditionPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.legal-section', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Header />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24" ref={containerRef}>
        <div className="grid lg:grid-cols-[1fr_300px] gap-16">
          {/* Content Column */}
          <div className="space-y-4">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                Last updated: April 2026
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 premium-text-gradient">
                Terms of <br /> Service
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                Please read these legal terms carefully before using CimessInvest.
                By accessing our services, you agree to be bound by these conditions.
              </p>
            </div>
            <LegalSection id="platform" title="1. Platform Nature" icon={Globe}>
              <p>
                We are <strong>Aimuan ThankGod</strong>, doing business as <strong>cimessinvest</strong> ("Company", "we", "us", "our"), a company registered in Nigeria at 54, Olude Bustop, Ipaja, Lagos, Nigeria.
              </p>

              <p>
                We operate the website <a href="https://www.cimessinvest.com" target="_blank" rel="noreferrer" className="text-blue-500 underline">https://www.cimessinvest.com</a> (the "Site"), as well as any other related products and services that refer or link to these legal terms (collectively, the "Services").
              </p>

              <p>
                You can contact us by phone at <strong>08089273565</strong>, email at <a href="mailto:cimessdev@gmail.com" className="text-blue-500 underline">cimessdev@gmail.com</a>, or by mail to 54, Olude Bustop, Ipaja, Lagos, Nigeria.
              </p>

              <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl mt-4">
                <p className="font-bold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-emerald-500" />
                  CRITICAL DISCLOSURE
                </p>
                <p className="text-xs uppercase tracking-wider leading-relaxed">
                  CimessInvest is a software platform that displays portfolio data and transaction records.
                  We do not execute trades, hold funds, or provide financial advice.
                  CimessInvest is NOT a broker-dealer, investment advisor, or financial institution.
                </p>
              </div>

              <p className="mt-4">
                These Legal Terms constitute a legally binding agreement made between you ("you")
                and Aimuan ThankGod concerning your access to and use of the Services. By accessing the Services,
                you agree that you have read, understood, and agreed to be bound by all of these Legal Terms.
                IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND MUST DISCONTINUE USE IMMEDIATELY.
              </p>

              <p>
                We will provide prior notice of any scheduled changes to the Services.
                The modified Legal Terms will become effective upon posting or notifying you by email at <a href="mailto:cimessdev@gmail.com" className="text-blue-500 underline">cimessdev@gmail.com</a>.
                By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.
              </p>

              <p>
                The Services are intended for users who are at least 18 years old. Persons under 18 are not permitted to use or register for the Services.
              </p>

              <p>
                We recommend that you print a copy of these Legal Terms for your records.
              </p>
            </LegalSection>

            <LegalSection id="jurisdiction" title="2. Jurisdiction and Regulatory Compliance" icon={Globe}>
              <p>
                The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country
                where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.
                Users accessing the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws.
              </p>

              <p className="mt-4">
                The Services are not tailored to comply with industry-specific regulations such as financial, healthcare, or data protection laws in any jurisdiction.
                Users may not use the Services in a way that would violate applicable laws, including the Nigeria Data Protection Regulation (NDPR) or other local regulatory requirements.
              </p>
            </LegalSection>

            <LegalSection id="ip" title="2. Intellectual Property Rights" icon={Scale}>
              <h3>Our intellectual property</h3>
              <p>
                We are the owner or the licensee of all intellectual property rights in our Services,
                including all source code, databases, functionality, software, website designs, audio, video, text,
                photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks,
                service marks, and logos contained therein (the "Marks").
              </p>
              <p>
                Our Content and Marks are protected by copyright and trademark laws, as well as other intellectual property rights and unfair competition laws,
                in Nigeria and around the world.
              </p>
              <p>
                The Content and Marks are provided in or through the Services <strong>"AS IS"</strong> for your personal, non-commercial use
                or internal business purposes only.
              </p>

              <h3>Your use of our Services</h3>
              <p>
                Subject to your compliance with these Legal Terms, including the <a href="#prohibited" className="text-blue-500 underline">PROHIBITED ACTIVITIES</a> section below,
                we grant you a non-exclusive, non-transferable, revocable license to:
              </p>
              <ul className='list-decimal pl-6 marker:text-gray-500 marker:text-xs'>
                <li>access the Services; and</li>
                <li>download or print a copy of any portion of the Content to which you have properly gained access,</li>
              </ul>
              <p>solely for your personal, non-commercial use or internal business purpose.</p>
              <p>
                Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks
                may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated,
                transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever,
                without our express prior written permission.
              </p>
              <p>
                If you wish to make any use of the Services, Content, or Marks other than as set out above, please contact:
                <a href="mailto:cimessdev@gmail.com">cimessdev@gmail.com</a>.
                Any permission granted must include attribution to us and visibility of copyright/proprietary notices.
              </p>
              <p>We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.</p>
              <p>
                Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms
                and your right to use our Services will terminate immediately.
              </p>

              <h3>Your submissions and contributions</h3>
              <p>
                Review this section and the <a href="#prohibited" className="text-blue-500 underline">PROHIBITED ACTIVITIES</a> section carefully prior to using our Services
                to understand the (a) rights you give us and (b) obligations you have when you post or upload content.
              </p>

              <p>
                <strong>Submissions:</strong> By sending us any question, comment, suggestion, idea, feedback, or other information
                about the Services ("Submissions"), you agree to assign to us all intellectual property rights in such Submission.
                We shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose,
                commercial or otherwise, without acknowledgment or compensation to you.
              </p>

              <p>
                <strong>Contributions:</strong> The Services may invite you to chat, contribute to, or participate in blogs, message boards,
                forums, and other functionality during which you may create, submit, post, display, transmit, publish, distribute, or
                broadcast content and materials to us or through the Services ("Contributions"). Any Submission publicly posted is also treated as a Contribution.
              </p>

              <p>
                When you post Contributions, you grant us a license (including use of your name, trademarks, and logos) to: use, copy, reproduce, distribute,
                sell, resell, publish, broadcast, retitle, store, publicly perform, publicly display, reformat, translate, excerpt (in whole or in part),
                exploit your Contributions (including your image, name, and voice) for any purpose, commercial, advertising, or otherwise,
                prepare derivative works, and sublicense the licenses granted in this section. Our use may occur in any media formats and channels.
              </p>

              <p>
                This license includes our use of your name, company name, franchise name, and any trademarks, service marks, trade names, logos,
                and personal/commercial images you provide.
              </p>

              <p>
                <strong>You are responsible for what you post or upload:</strong> By sending Submissions and/or posting Contributions, you:
              </p>
              <ul className='list-decimal pl-6 marker:text-gray-500 marker:text-xs'>
                <li>confirm you have read and agree with <a href="#prohibited" className="text-blue-500 underline">PROHIBITED ACTIVITIES</a> and will not post illegal, harassing, hateful, harmful,
                  defamatory, obscene, bullying, abusive, discriminatory, threatening, sexually explicit, false, inaccurate, deceitful, or misleading content;</li>
                <li>waive any moral rights to such Submission and/or Contribution, to the extent allowed by law;</li>
                <li>warrant that Submissions and/or Contributions are original or you have the necessary rights/licenses and full authority to grant us these rights;</li>
                <li>warrant that your Submissions and/or Contributions do not constitute confidential information.</li>
              </ul>

              <p>
                You are solely responsible for your Submissions and/or Contributions and expressly agree to reimburse us for any losses due to breach of this section,
                third-party intellectual property rights, or applicable law.
              </p>

              <p>
                <strong>We may remove or edit your Content:</strong> Although we have no obligation to monitor Contributions, we may remove or edit any Contributions at any time
                without notice if deemed harmful or in breach of these Legal Terms. This may include suspending or disabling your account and reporting to authorities.
              </p>

              <h3>Copyright infringement</h3>
              <p>
                We respect the intellectual property rights of others. If you believe any material available on or through the Services infringes your copyright,
                please immediately refer to the <a href="#copyrightyes" className="text-blue-500 underline">COPYRIGHT INFRINGEMENTS</a> section below.
              </p>
            </LegalSection>




            <LegalSection id="userreps" title="3. User Representations" icon={UserCheck}>
              <p>
                By using the Services, you represent and warrant that:
              </p>
              <ol className='list-decimal pl-6 marker:text-gray-500 marker:text-xs'>
                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update it as necessary.</li>
                <li>You have the legal capacity and agree to comply with these Legal Terms.</li>
                <li>You are not a minor in the jurisdiction in which you reside.</li>
                <li>You will not access the Services through automated or non-human means, whether via bot, script, or otherwise.</li>
                <li>You will not use the Services for any illegal or unauthorized purpose.</li>
                <li>Your use of the Services will not violate any applicable law or regulation in Nigeria or internationally.</li>
              </ol>
              <p>
                If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account
                and refuse any and all current or future use of the Services (or any portion thereof).
              </p>
            </LegalSection>



            <LegalSection id="userregistration" title="4. User Registration" icon={UserPlus}>
              <p>
                You may be required to register to use the Services. You agree to keep your password confidential
                and are fully responsible for all use of your account and password.
              </p>
              <p>
                We reserve the right to remove, reclaim, or change a username you select if we determine, at our sole discretion,
                that such username is inappropriate, obscene, or otherwise objectionable.
              </p>
              <p>
                You agree to comply with all applicable Nigerian laws and regulations, as well as international laws,
                in connection with your account and use of the Services.
              </p>
            </LegalSection>

            <LegalSection id="purchases" title="5. Purchases and Payment" icon={CreditCard}>
              <p>
                While the Services may not currently process payments from users, we plan to allow purchases in the future, primarily from managers.
                Accepted forms of payment may include bank transfers, debit/credit cards, or other methods made available through the Services at that time.
              </p>
              <p>
                When purchases are enabled, you will be required to provide current, complete, and accurate purchase and account information.
                You will also need to promptly update account and payment information, including email address, payment method, and payment card expiration date,
                so that transactions can be completed successfully and you can be contacted if necessary.
                Sales tax, VAT, or other applicable charges will be added to the price of purchases as required by Nigerian law or other relevant jurisdictions.
                All payments shall be in Naira (NGN) or any other accepted payment currency at that time.
              </p>
              <p>
                Users agree to pay all charges at the prices then in effect for their purchases and any applicable fees, and authorize us to charge the chosen payment provider
                when the Services are enabled for payments. We reserve the right to correct any errors or mistakes in pricing, even if payment has been initiated.
              </p>
              <p>
                We reserve the right to refuse or limit any order, and to cancel quantities purchased per person, per account, or per order.
                Restrictions may include multiple orders under the same account, payment method, or billing/shipping address.
                We may also limit or prohibit orders that appear to be placed by dealers, resellers, or distributors, at our sole discretion.
              </p>
            </LegalSection>

            <LegalSection id="Policy" title="6. Policy" icon={FileText}>
              <p>All sales are final and no refunds will be issued unless otherwise stated in specific service terms.</p>

            </LegalSection>

           <LegalSection id="ProhibitedActivities" title="7. Prohibited Activities" icon={FileText}>
  <p>
    You may not access or use the Services for any purpose other than that for which we make the Services available.
    The Services may not be used in connection with any commercial endeavors except those that are specifically
    endorsed or approved by us.
  </p>
  <p>As a user of the Services, you agree not to:</p>
  <ul className='list-decimal pl-6 marker:text-gray-500 marker:text-xs'>
    <li>
      Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a
      collection, compilation, database, or directory without written permission from us.
    </li>
    <li>
      Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information
      such as user passwords.
    </li>
    <li>
      Circumvent, disable, or otherwise interfere with security-related features of the Services, including features
      that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services
      and/or the Content contained therein.
    </li>
    <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
    <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
    <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
    <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
    <li>Engage in unauthorized framing of or linking to the Services.</li>
    <li>
      Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including
      excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any
      party's uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes
      with the use, features, functions, operation, or maintenance of the Services.
    </li>
    <li>
      Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data
      mining, robots, or similar data gathering and extraction tools.
    </li>
    <li>Delete the copyright or other proprietary rights notice from any Content.</li>
    <li>Attempt to impersonate another user or person or use the username of another user.</li>
    <li>
      Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active
      information collection or transmission mechanism, including without limitation, clear graphics interchange formats
      ("gifs"), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as "spyware" or
      "passive collection mechanisms" or "pcms").
    </li>
    <li>
      Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the
      Services.
    </li>
    <li>
      Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the
      Services to you.
    </li>
    <li>
      Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any
      portion of the Services.
    </li>
    <li>
      Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.
    </li>
    <li>
      Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software
      comprising or in any way making up a part of the Services.
    </li>
    <li>
      Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or
      distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or
      offline reader that accesses the Services, or use or launch any unauthorized script or other software.
    </li>
    <li>Use a buying agent or purchasing agent to make purchases on the Services.</li>
    <li>
      Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by
      electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated
      means or under false pretenses.
    </li>
    <li>
      Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for
      any revenue-generating endeavor or commercial enterprise.
    </li>
    <li>Use the Services to advertise or offer to sell goods and services.</li>
    <li>Sell or otherwise transfer your profile.</li>
    <li>Entering false, misleading, or manipulated financial data.</li>
    <li>Using the platform to deceive, defraud, or mislead other users.</li>
    <li>Providing investment advice while falsely representing affiliation with CimessInvest.</li>
    <li>Using the platform for unauthorized financial activities or illegal transactions.</li>
    <li>Accessing or attempting to access other users' accounts without authorization.</li>
    <li>Using automated systems (bots) to abuse or exploit the platform.</li>
    <li>Uploading or transmitting malicious code or harmful data.</li>
    <li>Engaging in any activity that could damage, disable, or impair the platform.</li>
  </ul>
</LegalSection>

<LegalSection id="UserGeneratedContributions" title="8. User Generated Contributions" icon={FileText}>
  <p>
    The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and
    other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform,
    publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to
    text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other
    material (collectively, "Contributions"). Contributions may be viewable by other users of the Services and through
    third-party websites. As such, any Contributions you transmit may be treated as non-confidential and
    non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:
  </p>
  <ul className='list-decimal pl-6 marker:text-gray-500 marker:text-xs'>
    <li>
      The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or
      copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to
      the copyright, patent, trademark, trade secret, or moral rights of any third party.
    </li>
    <li>
      You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to
      use and to authorize us, the Services, and other users of the Services to use your Contributions in any manner
      contemplated by the Services and these Legal Terms.
    </li>
    <li>
      You have the written consent, release, and/or permission of each and every identifiable individual person in your
      Contributions to use the name or likeness of each and every such identifiable individual person to enable
      inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms.
    </li>
    <li>Your Contributions are not false, inaccurate, or misleading.</li>
    <li>
      Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain
      letters, spam, mass mailings, or other forms of solicitation.
    </li>
    <li>
      Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or
      otherwise objectionable (as determined by us).
    </li>
    <li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
    <li>
      Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and
      to promote violence against a specific person or class of people.
    </li>
    <li>Your Contributions do not violate any applicable law, regulation, or rule.</li>
    <li>Your Contributions do not violate the privacy or publicity rights of any third party.</li>
    <li>
      Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to
      protect the health or well-being of minors.
    </li>
    <li>
      Your Contributions do not include any offensive comments that are connected to race, national origin, gender,
      sexual preference, or physical handicap.
    </li>
    <li>
      Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal
      Terms, or any applicable law or regulation.
    </li>
  </ul>
  <p>
    Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other
    things, termination or suspension of your rights to use the Services.
  </p>
</LegalSection>

<LegalSection id="ContributionLicense" title="9. Contribution License" icon={FileText}>
  <p>
    By posting your Contributions to any part of the Services or making Contributions accessible to the Services by
    linking your account from the Services to any of your social networking accounts, you automatically grant, and you
    represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual,
    non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce,
    disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display,
    reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including,
    without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare
    derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of
    the foregoing. The use and distribution may occur in any media formats and through any media channels.
  </p>
  <p>
    This license will apply to any form, media, or technology now known or hereafter developed, and includes our use
    of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade
    names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions,
    and you warrant that moral rights have not otherwise been asserted in your Contributions.
  </p>
  <p>
    We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and
    any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable
    for any statements or representations in your Contributions provided by you in any area on the Services. You are
    solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all
    responsibility and to refrain from any legal action against us regarding your Contributions.
  </p>
  <p>
    We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any
    Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations on the Services;
    and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no
    obligation to monitor your Contributions.
  </p>
</LegalSection>

<LegalSection id="SocialMedia" title="10. Social Media" icon={FileText}>
  <p>
    As part of the functionality of the Services, you may link your account with online accounts you have with
    third-party service providers (each such account, a "Third-Party Account") by either: (1) providing your
    Third-Party Account login information through the Services; or (2) allowing us to access your Third-Party Account,
    as is permitted under the applicable terms and conditions that govern your use of each Third-Party Account. You
    represent and warrant that you are entitled to disclose your Third-Party Account login information to us and/or
    grant us access to your Third-Party Account, without breach by you of any of the terms and conditions that govern
    your use of the applicable Third-Party Account, and without obligating us to pay any fees or making us subject to
    any usage limitations imposed by the third-party service provider of the Third-Party Account.
  </p>
  <p>
    By granting us access to any Third-Party Accounts, you understand that (1) we may access, make available, and
    store (if applicable) any content that you have provided to and stored in your Third-Party Account (the "Social
    Network Content") so that it is available on and through the Services via your account, including without
    limitation any friend lists and (2) we may submit to and receive from your Third-Party Account additional
    information to the extent you are notified when you link your account with the Third-Party Account.
  </p>
  <p>
    Depending on the Third-Party Accounts you choose and subject to the privacy settings that you have set in such
    Third-Party Accounts, personally identifiable information that you post to your Third-Party Accounts may be
    available on and through your account on the Services. Please note that if a Third-Party Account or associated
    service becomes unavailable or our access to such Third-Party Account is terminated by the third-party service
    provider, then Social Network Content may no longer be available on and through the Services. You will have the
    ability to disable the connection between your account on the Services and your Third-Party Accounts at any time.
  </p>
  <p>
    PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY
    ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS. We make no effort to
    review any Social Network Content for any purpose, including but not limited to, for accuracy, legality, or
    non-infringement, and we are not responsible for any Social Network Content.
  </p>
  <p>
    You acknowledge and agree that we may access your email address book associated with a Third-Party Account and
    your contacts list stored on your mobile device or tablet computer solely for purposes of identifying and informing
    you of those contacts who have also registered to use the Services. You can deactivate the connection between the
    Services and your Third-Party Account by contacting us using the contact information below or through your account
    settings (if applicable). We will attempt to delete any information stored on our servers that was obtained
    through such Third-Party Account, except the username and profile picture that become associated with your
    account.
  </p>
</LegalSection>

<LegalSection id="ThirdParty" title="11. Third-Party Websites and Content" icon={FileText}>
  <p>
    The Services may contain (or you may be sent via the Site) links to other websites ("Third-Party Websites") as
    well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications,
    software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such
    Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy,
    appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through
    the Services or any Third-Party Content posted on, available through, or installed from the Services, including
    the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained
    in the Third-Party Websites or the Third-Party Content.
  </p>
  <p>
    Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party
    Content does not imply approval or endorsement thereof by us. If you decide to leave the Services and access the
    Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be
    aware these Legal Terms no longer govern. You should review the applicable terms and policies, including privacy
    and data gathering practices, of any website to which you navigate from the Services or relating to any
    applications you use or install from the Services.
  </p>
  <p>
    Any purchases you make through Third-Party Websites will be through other websites and from other companies, and
    we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the
    applicable third party. You agree and acknowledge that we do not endorse the products or services offered on
    Third-Party Websites and you shall hold us blameless from any harm caused by your purchase of such products or
    services. Additionally, you shall hold us blameless from any losses sustained by you or harm caused to you
    relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.
  </p>
</LegalSection>

<LegalSection id="ServicesManagement" title="12. Services Management" icon={FileText}>
  <p>
    We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms;
    (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal
    Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion
    and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent
    technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without
    limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are
    excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner
    designed to protect our rights and property and to facilitate the proper functioning of the Services.
  </p>
</LegalSection>

<LegalSection id="PrivacyPolicy" title="13. Privacy Policy" icon={FileText}>
  <p>
    We care about data privacy and security. By using the Services, you agree to be bound by our Privacy Policy posted
    on the Services, which is incorporated into these Legal Terms. Please be advised the Services are hosted in
    Germany and Nigeria. If you access the Services from any other region of the world with laws or other requirements
    governing personal data collection, use, or disclosure that differ from applicable laws in Germany and Nigeria,
    then through your continued use of the Services, you are transferring your data to Germany and Nigeria, and you
    expressly consent to have your data transferred to and processed in Germany and Nigeria.
  </p>
</LegalSection>

<LegalSection id="CopyrightInfringements" title="14. Copyright Infringements" icon={FileText}>
  <p>
    We respect the intellectual property rights of others. If you believe that any material available on or through
    the Services infringes upon any copyright you own or control, please immediately notify us using the contact
    information provided below (a "Notification"). A copy of your Notification will be sent to the person who posted
    or stored the material addressed in the Notification. Please be advised that pursuant to applicable law you may be
    held liable for damages if you make material misrepresentations in a Notification. Thus, if you are not sure that
    material located on or linked to by the Services infringes your copyright, you should consider first contacting an
    attorney.
  </p>
</LegalSection>

<LegalSection id="TermTermination" title="15. Term and Termination" icon={FileText}>
  <p>
    These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER
    PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY,
    DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR
    FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN
    THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE
    SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN
    OUR SOLE DISCRETION.
  </p>
  <p>
    If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new
    account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on
    behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take
    appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
  </p>
</LegalSection>

<LegalSection id="ModificationsInterruptions" title="16. Modifications and Interruptions" icon={FileText}>
  <p>
    We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at
    our sole discretion without notice. However, we have no obligation to update any information on our Services. We
    also reserve the right to modify or discontinue all or part of the Services without notice at any time. We will
    not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the
    Services.
  </p>
  <p>
    We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other
    problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We
    reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time
    or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or
    inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the
    Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to
    supply any corrections, updates, or releases in connection therewith.
  </p>
</LegalSection>

<LegalSection id="GoverningLaw" title="17. Governing Law" icon={FileText}>
  <p>
    These Legal Terms shall be governed by and defined following the laws of Nigeria. Aimuan ThankGod and yourself
    irrevocably consent that the courts of Nigeria shall have exclusive jurisdiction to resolve any dispute which may
    arise in connection with these Legal Terms.
  </p>
</LegalSection>

<LegalSection id="DisputeResolution" title="18. Dispute Resolution" icon={FileText}>
  <h3>Informal Negotiations</h3>
  <p>
    To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms
    (each a "Dispute" and collectively, the "Disputes") brought by either you or us (individually, a "Party" and
    collectively, the "Parties"), the Parties agree to first attempt to negotiate any Dispute (except those Disputes
    expressly provided below) informally for at least thirty (30) days before initiating arbitration. Such informal
    negotiations commence upon written notice from one Party to the other Party.
  </p>

  <h3>Binding Arbitration</h3>
  <p>
    Any dispute arising out of or in connection with these Legal Terms, including any question regarding its
    existence, validity, or termination, shall be referred to and finally resolved by the International Commercial
    Arbitration Court under the European Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146) according to the
    Rules of this ICAC, which, as a result of referring to it, is considered as the part of this clause. The number
    of arbitrators shall be one (1). The seat, or legal place, or arbitration shall be Lagos, Nigeria. The language of
    the proceedings shall be English. The governing law of these Legal Terms shall be substantive law of Nigeria.
  </p>

  <h3>Restrictions</h3>
  <p>
    The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the
    full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right
    or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and
    (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf
    of the general public or any other persons.
  </p>

  <h3>Exceptions to Informal Negotiations and Arbitration</h3>
  <p>
    The Parties agree that the following Disputes are not subject to the above provisions concerning informal
    negotiations binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of,
    any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of
    theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. If this
    provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling
    within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a
    court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit
    to the personal jurisdiction of that court.
  </p>
</LegalSection>

<LegalSection id="Corrections" title="19. Corrections" icon={FileText}>
  <p>
    There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including
    descriptions, pricing, availability, and various other information. We reserve the right to correct any errors,
    inaccuracies, or omissions and to change or update the information on the Services at any time, without prior
    notice.
  </p>
</LegalSection>

<LegalSection id="Disclaimer" title="20. Disclaimer" icon={FileText}>
  <p>
    THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT
    YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN
    CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS
    ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE
    APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS,
    MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE
    WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR
    SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY
    INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE
    LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS
    IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT
    POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR
    ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY
    HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE
    WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY
    THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM
    OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
  </p>
</LegalSection>

<LegalSection id="LimitationsLiability" title="21. Limitations of Liability" icon={FileText}>
  <p>
    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT,
    INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST
    REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF
    THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU
    FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER OF
    THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING OR
    $500.00 USD. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE
    EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR
    LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
  </p>
</LegalSection>

<LegalSection id="Indemnification" title="22. Indemnification" icon={FileText}>
  <p>
    You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our
    respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or
    demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1)
    your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your
    representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party,
    including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of
    the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at
    your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify
    us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts
    to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming
    aware of it.
  </p>
</LegalSection>

<LegalSection id="UserData" title="23. User Data" icon={FileText}>
  <p>
    We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the
    Services, as well as data relating to your use of the Services. Although we perform regular routine backups of
    data, you are solely responsible for all data that you transmit or that relates to any activity you have
    undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any
    such data, and you hereby waive any right of action against us arising from any such loss or corruption of such
    data.
  </p>
</LegalSection>

<LegalSection id="ElectronicCommunications" title="24. Electronic Communications, Transactions, and Signatures" icon={FileText}>
  <p>
    Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You
    consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other
    communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that
    such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND
    OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR
    COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations,
    rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention
    of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
  </p>
</LegalSection>

<LegalSection id="CaliforniaUsers" title="25. California Users and Residents" icon={FileText}>
  <p>
    If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the
    Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market
    Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
  </p>
</LegalSection>

<LegalSection id="Miscellaneous" title="26. Miscellaneous" icon={FileText}>
  <p>
    These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services
    constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right
    or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms
    operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others
    at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any
    cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to
    be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal
    Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture,
    partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use
    of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted
    them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the
    lack of signing by the parties hereto to execute these Legal Terms.
  </p>
</LegalSection>

<LegalSection id="PlatformDisclaimer" title="27. Platform Use and Financial Disclaimer" icon={FileText}>
  <p>
    CimessInvest is a technology platform that allows registered managers to record and display their clients' trading
    activities and financial data. CimessInvest does not provide financial advice, investment services, or brokerage
    services. All trading, purchases, and financial transactions are conducted outside of the CimessInvest platform by
    the managers themselves.
  </p>
  <p>By using CimessInvest, you acknowledge and agree that:</p>
  <ol className='list-decimal pl-6 marker:text-gray-500 marker:text-xs'>
    <li>
      CimessInvest is not responsible for any financial losses, gains, or investment decisions made by you or your
      manager.
    </li>
    <li>
      CimessInvest does not handle, hold, or process any user funds; all monetary transactions occur off-platform.
    </li>
    <li>
      Managers must obtain proper consent from their clients to manage and record their trading activities on
      CimessInvest.
    </li>
    <li>
      Users cannot hold CimessInvest liable for any disputes or issues arising from trades, portfolio management, or
      financial outcomes.
    </li>
    <li>
      CimessInvest provides data visualization and tracking services only, and all financial responsibility lies with
      the managers and their clients.
    </li>
  </ol>
</LegalSection>

<LegalSection id="ContactUs" title="28. Contact Us" icon={FileText}>
  <p>
    In order to resolve a complaint regarding the Services or to receive further information regarding use of the
    Services, please contact us at:
  </p>
  <p>
    <strong>Aimuan ThankGod</strong>
    <br />
    54, Olude Bustop
    <br />
    Ipaja, Lagos
    <br />
    Nigeria
    <br />
    <strong>Phone:</strong> 08089273565
    <br />
    <strong>Email:</strong> cimessdev@gmail.com
  </p>
</LegalSection>

          </div>

          {/* Sidebar Navigation */}
          <div className="hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Navigation</h3>
                <nav className="space-y-1">
                  <NavLink href="#platform">Platform Nature</NavLink>
                  <NavLink href="#ip">Intellectual Property</NavLink>
                  <NavLink href="#user-reps">User Representations</NavLink>
                  <NavLink href="#financial">Financial Disclaimer</NavLink>
                  <NavLink href="#payments">Purchases & Payment</NavLink>
                  <NavLink href="#prohibited">Prohibited Activities</NavLink>
                  <NavLink href="#social">Social Media</NavLink>
                  <NavLink href="#privacy">Privacy & Data</NavLink>
                  <NavLink href="#termination">Termination</NavLink>
                  <NavLink href="#liability">Liability</NavLink>
                  <NavLink href="#contact">Contact Support</NavLink>
                </nav>
              </div>

              <div className="p-6 glass-panel rounded-3xl border border-white/5">
                <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Need Help?</p>
                <p className="text-slate-500 text-xs leading-relaxed mb-6">
                  Have questions about our legal terms or privacy practices?
                </p>
                <button className="w-full py-3 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}