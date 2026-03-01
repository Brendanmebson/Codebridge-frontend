import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Button, useTheme, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import GavelIcon from '@mui/icons-material/Gavel';
import CheckIcon from '@mui/icons-material/Check';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function useFadeIn(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const sections = [
  { id: 'collection', label: 'Data We Collect', icon: <StorageOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: 'use', label: 'How We Use It', icon: <VisibilityOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: 'sharing', label: 'Sharing & Disclosure', icon: <ShareOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: 'security', label: 'Data Security', icon: <LockOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: 'rights', label: 'Your Rights', icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: 'retention', label: 'Data Retention', icon: <DeleteOutlineIcon sx={{ fontSize: 18 }} /> },
  { id: 'cookies', label: 'Cookies', icon: <CookieOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: 'children', label: 'Children\'s Privacy', icon: <ChildCareOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: 'updates', label: 'Policy Updates', icon: <UpdateOutlinedIcon sx={{ fontSize: 18 }} /> },
  { id: 'contact', label: 'Contact Us', icon: <ContactMailOutlinedIcon sx={{ fontSize: 18 }} /> },
];

const PrivacyPolicy: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;
  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`;
  const [activeSection, setActiveSection] = useState('collection');

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const { ref: overviewRef, visible: overviewVisible } = useFadeIn();
  const { ref: contentRef, visible: contentVisible } = useFadeIn(0.05);

  const quickStats = [
    { val: 'AES-256', label: 'Encryption Standard', sub: 'Bank-grade security' },
    { val: 'Zero', label: 'Data Sold', sub: 'We never sell your data' },
    { val: '7 Years', label: 'Retention Period', sub: 'As required by law' },
    { val: 'NDPR', label: 'Compliant', sub: 'Nigerian Data Protection Reg.' },
  ];

  const rights = [
    { title: 'Right to Access', desc: 'Request a copy of all personal data we hold about you at any time.', color: palette.primary.dark, accent: palette.primary.main },
    { title: 'Right to Rectification', desc: 'Correct inaccurate or incomplete personal information in your profile.', color: palette.info.dark, accent: palette.info.main },
    { title: 'Right to Erasure', desc: 'Request deletion of your personal data where there is no compelling reason for continued processing.', color: palette.secondary.dark, accent: palette.secondary.main },
    { title: 'Right to Object', desc: 'Object to processing of your personal data for direct marketing or profiling purposes.', color: palette.primary.dark, accent: palette.primary.light },
    { title: 'Right to Portability', desc: 'Receive your personal data in a structured, commonly used machine-readable format.', color: palette.info.dark, accent: palette.info.light },
    { title: 'Right to Complain', desc: 'Lodge a complaint with the Nigeria Data Protection Bureau (NDPB) at any time.', color: palette.secondary.dark, accent: palette.secondary.main },
  ];

  const contentSections: {
    id: string;
    icon: React.ReactNode;
    title: string;
    color: string;
    accent: string;
    body: React.ReactNode;
  }[] = [
    {
      id: 'collection',
      icon: <StorageOutlinedIcon sx={{ fontSize: 24 }} />,
      title: 'Data We Collect',
      color: palette.primary.dark,
      accent: palette.primary.main,
      body: (
        <Box>
          <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, lineHeight: 1.9, mb: 3 }}>
            We collect only the information necessary to provide cooperative services and fulfill our legal obligations as a regulated cooperative society in Nigeria.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            {[
              { cat: 'Identity Data', items: ['Full legal name', 'Date of birth', 'Government-issued ID number', 'Passport photograph'] },
              { cat: 'Contact Data', items: ['Email address', 'Phone number', 'Residential address', 'Next-of-kin details'] },
              { cat: 'Financial Data', items: ['Bank account details', 'Savings transaction history', 'Loan application information', 'Repayment records'] },
              { cat: 'Technical Data', items: ['IP address and browser type', 'Device identifiers', 'Login timestamps', 'Portal usage patterns'] },
            ].map((block, i) => (
              <Box key={i} sx={{ p: 3, borderRadius: `${br * 1.5}px`, background: palette.background.default, border: `1px solid ${palette.background.default}` }}>
                <Typography variant="overline" sx={{ color: palette.primary.main, display: 'block', mb: 1.5 }}>{block.cat}</Typography>
                {block.items.map((item, j) => (
                  <Box key={j} sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: j < block.items.length - 1 ? 1 : 0 }}>
                    <Box sx={{ width: 16, height: 16, borderRadius: '50%', background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckIcon sx={{ fontSize: 10, color: palette.primary.main }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: palette.text.primary, fontSize: '0.83rem' }}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      ),
    },
    {
      id: 'use',
      icon: <VisibilityOutlinedIcon sx={{ fontSize: 24 }} />,
      title: 'How We Use Your Information',
      color: palette.info.dark,
      accent: palette.info.main,
      body: (
        <Box>
          <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, lineHeight: 1.9, mb: 3 }}>
            Your information is processed solely to operate the cooperative and serve your membership. We rely on the following legal bases for processing.
          </Typography>
          {[
            { basis: 'Contract Performance', desc: 'Processing your savings, loan applications, and account management is necessary to fulfil our membership agreement with you.', color: palette.primary.dark },
            { basis: 'Legal Obligation', desc: 'We are required by Nigerian cooperative law and anti-money laundering regulations to collect and retain certain member information.', color: palette.info.dark },
            { basis: 'Legitimate Interest', desc: 'We use technical data to improve platform security, detect fraud, and optimise the member experience.', color: palette.secondary.dark },
            { basis: 'Consent', desc: 'Where we send you newsletters or promotional communications, we rely on your explicit opt-in consent, which you may withdraw at any time.', color: palette.primary.dark },
          ].map((item, i) => (
            <Box key={i} sx={{
              display: 'flex', gap: 2.5, mb: 2,
              p: 3, borderRadius: `${br * 1.5}px`,
              background: palette.background.default,
              border: `1px solid ${palette.background.default}`,
              transition: 'all 0.3s',
              '&:hover': { transform: 'translateX(5px)', borderColor: `${item.color}15`, background: palette.background.paper },
            }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: item.color, flexShrink: 0, mt: 0.6 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, mb: 0.4 }}>{item.basis}</Typography>
                <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.75, fontWeight: 300 }}>{item.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ),
    },
    {
      id: 'sharing',
      icon: <ShareOutlinedIcon sx={{ fontSize: 24 }} />,
      title: 'Sharing & Disclosure',
      color: palette.secondary.dark,
      accent: palette.secondary.main,
      body: (
        <Box>
          <Box sx={{ p: 3, borderRadius: `${br * 1.5}px`, background: `${palette.primary.main}07`, border: `1px solid ${palette.primary.main}15`, mb: 3, display: 'flex', gap: 2 }}>
            <InfoOutlinedIcon sx={{ fontSize: 20, color: palette.primary.main, flexShrink: 0, mt: 0.15 }} />
            <Typography variant="body2" sx={{ color: palette.text.primary, lineHeight: 1.75 }}>
              <strong>We do not sell, rent, or trade your personal data to third parties.</strong> We share data only as described below.
            </Typography>
          </Box>
          {[
            { party: 'Regulatory Authorities', desc: 'We may disclose member information to the Nigeria Data Protection Bureau, Central Bank of Nigeria, or other regulators when legally required.' },
            { party: 'Service Providers', desc: 'Trusted technical partners (e.g., cloud hosting, SMS gateway) who process data strictly on our instructions and under data processing agreements.' },
            { party: 'Law Enforcement', desc: 'Where required by a valid court order, warrant, or legal process, we will disclose minimum necessary information.' },
            { party: 'Auditors', desc: 'Our independent external auditors access financial data as part of the statutory annual audit — bound by professional confidentiality obligations.' },
          ].map((item, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 2.5, mb: 2, p: 3, borderRadius: `${br * 1.5}px`, background: palette.background.default, border: `1px solid ${palette.background.default}`, transition: 'all 0.3s', '&:hover': { transform: 'translateX(5px)', borderColor: `${palette.secondary.main}15` } }}>
              <Box sx={{ width: 28, height: 28, borderRadius: `${br - 4}px`, background: `${palette.secondary.dark}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CheckIcon sx={{ fontSize: 13, color: palette.secondary.dark }} />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, mb: 0.4 }}>{item.party}</Typography>
                <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.75, fontWeight: 300 }}>{item.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ),
    },
    {
      id: 'security',
      icon: <LockOutlinedIcon sx={{ fontSize: 24 }} />,
      title: 'Data Security',
      color: palette.primary.dark,
      accent: palette.primary.main,
      body: (
        <Box>
          <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, lineHeight: 1.9, mb: 3 }}>
            We implement bank-grade technical and organisational measures to protect your personal data from unauthorised access, alteration, disclosure, or destruction.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3,1fr)' }, gap: 2, mb: 3 }}>
            {[
              { icon: <LockOutlinedIcon sx={{ fontSize: 20 }} />, title: 'AES-256 Encryption', desc: 'All data encrypted at rest and in transit' },
              { icon: <SecurityOutlinedIcon sx={{ fontSize: 20 }} />, title: 'SSL / TLS', desc: 'Secure connections across the entire platform' },
              { icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 20 }} />, title: 'Access Controls', desc: 'Role-based access — staff see only what they need' },
            ].map((s, i) => (
              <Box key={i} sx={{ p: 3, borderRadius: `${br * 1.5}px`, background: palette.background.default, textAlign: 'center', border: `1px solid ${palette.background.default}`, transition: 'all 0.3s', '&:hover': { borderColor: `${palette.primary.main}15`, transform: 'translateY(-3px)' } }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '50%', background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.primary.main, mx: 'auto', mb: 1.5 }}>{s.icon}</Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, mb: 0.5 }}>{s.title}</Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.6, display: 'block' }}>{s.desc}</Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.8, fontWeight: 300 }}>
            While we maintain robust safeguards, no internet transmission is 100% secure. In the event of a data breach that affects your rights, we will notify you within 72 hours as required by the NDPR.
          </Typography>
        </Box>
      ),
    },
    {
      id: 'rights',
      icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 24 }} />,
      title: 'Your Rights',
      color: palette.info.dark,
      accent: palette.info.main,
      body: (
        <Box>
          <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, lineHeight: 1.9, mb: 3 }}>
            Under the Nigeria Data Protection Regulation (NDPR) 2019, you have the following rights regarding your personal data. To exercise any right, contact our Data Protection Officer.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            {rights.map((r, i) => (
              <Box key={i} sx={{
                p: 3, borderRadius: `${br * 1.5}px`,
                background: palette.background.default,
                border: `1px solid ${palette.background.default}`,
                transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': { transform: 'translateY(-4px)', borderColor: `${r.color}18`, boxShadow: `0 12px 32px ${r.color}0e`, background: palette.background.paper },
              }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: `linear-gradient(135deg, ${r.color}, ${r.accent})`, mb: 1.5 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, mb: 0.5 }}>{r.title}</Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, display: 'block' }}>{r.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ),
    },
    {
      id: 'retention',
      icon: <DeleteOutlineIcon sx={{ fontSize: 24 }} />,
      title: 'Data Retention',
      color: palette.secondary.dark,
      accent: palette.secondary.main,
      body: (
        <Box>
          <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, lineHeight: 1.9, mb: 3 }}>
            We retain your data only for as long as necessary to fulfil the purposes for which it was collected, including legal, regulatory, and reporting requirements.
          </Typography>
          {[
            { type: 'Member Account Data', period: '7 years after membership ends', reason: 'Nigerian cooperative law and financial record-keeping obligations.' },
            { type: 'Loan & Savings Records', period: '7 years after final transaction', reason: 'Anti-money laundering regulation and audit requirements.' },
            { type: 'Identity Documents', period: 'Duration of membership + 3 years', reason: 'KYC compliance and potential dispute resolution.' },
            { type: 'Communication Records', period: '2 years', reason: 'Customer service quality and complaint management.' },
            { type: 'Technical / Log Data', period: '12 months', reason: 'Security monitoring and fraud detection.' },
          ].map((row, i) => (
            <Box key={i} sx={{
              display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2,
              p: 2.5, mb: 1.5, borderRadius: `${br * 1.5}px`,
              background: i % 2 === 0 ? palette.background.default : palette.background.paper,
              border: `1px solid ${palette.background.default}`,
              transition: 'all 0.25s', '&:hover': { borderColor: `${palette.secondary.main}15` },
            }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary }}>{row.type}</Typography>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, height: 'fit-content' }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: palette.secondary.dark, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: palette.secondary.dark, fontWeight: 500 }}>{row.period}</Typography>
              </Box>
              <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.6, display: 'block' }}>{row.reason}</Typography>
            </Box>
          ))}
        </Box>
      ),
    },
    {
      id: 'cookies',
      icon: <CookieOutlinedIcon sx={{ fontSize: 24 }} />,
      title: 'Cookies & Tracking',
      color: palette.primary.dark,
      accent: palette.primary.main,
      body: (
        <Box>
          <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, lineHeight: 1.9, mb: 3 }}>
            Our platform uses a minimal set of cookies to ensure functionality and security. We do not use advertising or cross-site tracking cookies.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            {[
              { type: 'Strictly Necessary', required: true, desc: 'Session management, authentication tokens, and security features. Cannot be disabled.' },
              { type: 'Functional', required: true, desc: 'Remember your preferences such as language and login state across sessions.' },
              { type: 'Analytics', required: false, desc: 'Aggregate, anonymised usage statistics to improve the platform. Opt-out available.' },
              { type: 'Marketing', required: false, desc: 'We do not use marketing or advertising cookies on the CodeBridge platform.' },
            ].map((c, i) => (
              <Box key={i} sx={{ p: 3, borderRadius: `${br * 1.5}px`, background: palette.background.default, border: `1px solid ${palette.background.default}`, transition: 'all 0.3s', '&:hover': { borderColor: `${palette.primary.main}15` } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.25 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary }}>{c.type}</Typography>
                  <Box sx={{ px: 1.25, py: 0.3, borderRadius: '100px', background: c.required ? `${palette.primary.main}12` : `${palette.text.secondary}10`, border: `1px solid ${c.required ? palette.primary.main + '22' : palette.text.secondary + '15'}` }}>
                    <Typography variant="caption" sx={{ color: c.required ? palette.primary.main : palette.text.secondary, fontWeight: 600, fontSize: '0.68rem' }}>
                      {c.required ? 'Required' : 'Optional'}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, display: 'block' }}>{c.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ),
    },
    {
      id: 'children',
      icon: <ChildCareOutlinedIcon sx={{ fontSize: 24 }} />,
      title: "Children's Privacy",
      color: palette.secondary.dark,
      accent: palette.secondary.main,
      body: (
        <Box>
          <Box sx={{ p: 3.5, borderRadius: `${br * 1.5}px`, background: `${palette.secondary.dark}07`, border: `1px solid ${palette.secondary.dark}15`, mb: 3, display: 'flex', gap: 2 }}>
            <ChildCareOutlinedIcon sx={{ fontSize: 22, color: palette.secondary.dark, flexShrink: 0, mt: 0.1 }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, mb: 0.5 }}>Our services are intended for adults only.</Typography>
              <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.8, fontWeight: 300 }}>
                CodeBridge Cooperative does not knowingly collect personal information from individuals under the age of 18. Membership requires that applicants be at least 18 years old. If we become aware that a minor has provided personal data, we will take immediate steps to delete that information.
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.85, fontWeight: 300 }}>
            If you believe a minor has submitted personal data to us without parental consent, please contact our Data Protection Officer immediately at <Box component="span" sx={{ color: palette.primary.main, fontWeight: 500 }}>dpo@codebridgecoop.ng</Box> and we will investigate and delete the data within 72 hours.
          </Typography>
        </Box>
      ),
    },
    {
      id: 'updates',
      icon: <UpdateOutlinedIcon sx={{ fontSize: 24 }} />,
      title: 'Policy Updates',
      color: palette.info.dark,
      accent: palette.info.main,
      body: (
        <Box>
          <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, lineHeight: 1.9, mb: 3 }}>
            We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. All updates are governed by the following principles.
          </Typography>
          {[
            { title: 'Advance Notice', desc: 'Material changes are communicated to members at least 30 days before taking effect via email and an in-app notice.' },
            { title: 'Version History', desc: 'Previous versions of this policy are archived and available on request from our Data Protection Officer.' },
            { title: 'Continued Use', desc: 'Your continued use of the cooperative portal after a notified update constitutes acceptance of the revised policy.' },
            { title: 'Right to Object', desc: 'If you do not agree with a material change, you may close your account and request data deletion before the change takes effect.' },
          ].map((item, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 2.5, mb: 2, p: 3, borderRadius: `${br * 1.5}px`, background: palette.background.default, border: `1px solid ${palette.background.default}`, transition: 'all 0.3s', '&:hover': { transform: 'translateX(5px)', borderColor: `${palette.info.main}15` } }}>
              <Box sx={{ width: 28, height: 28, borderRadius: `${br - 4}px`, background: `${palette.info.dark}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CheckIcon sx={{ fontSize: 13, color: palette.info.dark }} />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, mb: 0.4 }}>{item.title}</Typography>
                <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.75, fontWeight: 300 }}>{item.desc}</Typography>
              </Box>
            </Box>
          ))}
          <Box sx={{
            mt: 3, p: 3, borderRadius: `${br * 1.5}px`,
            background: palette.background.default,
            border: `1px solid ${palette.info.main}15`,
            display: 'flex', alignItems: 'center', gap: 2,
          }}>
            <UpdateOutlinedIcon sx={{ fontSize: 20, color: palette.info.main, flexShrink: 0 }} />
            <Typography variant="body2" sx={{ color: palette.text.secondary }}>
              <Box component="span" sx={{ fontWeight: 600, color: palette.text.primary }}>Last updated: </Box>
              January 15, 2025 · Version 2.1
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'contact',
      icon: <ContactMailOutlinedIcon sx={{ fontSize: 24 }} />,
      title: 'Contact Our DPO',
      color: palette.primary.dark,
      accent: palette.primary.main,
      body: (
        <Box>
          <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, lineHeight: 1.9, mb: 3 }}>
            For any privacy-related requests, concerns, or to exercise your data rights, contact our designated Data Protection Officer directly.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            {[
              { label: 'DPO Name', val: 'Dr Amaka Eze', icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 18 }} /> },
              { label: 'Email', val: 'dpo@codebridgecoop.ng', icon: <ContactMailOutlinedIcon sx={{ fontSize: 18 }} /> },
              { label: 'Phone', val: '+234 901 234 5678', icon: <ContactMailOutlinedIcon sx={{ fontSize: 18 }} /> },
              { label: 'Response SLA', val: '72 hours maximum', icon: <UpdateOutlinedIcon sx={{ fontSize: 18 }} /> },
            ].map((c, i) => (
              <Box key={i} sx={{ p: 2.5, borderRadius: `${br * 1.5}px`, background: palette.background.default, border: `1px solid ${palette.background.default}`, display: 'flex', gap: 2, alignItems: 'center', transition: 'all 0.3s', '&:hover': { borderColor: `${palette.primary.main}15` } }}>
                <Box sx={{ width: 34, height: 34, borderRadius: `${br - 4}px`, background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.primary.main, flexShrink: 0 }}>{c.icon}</Box>
                <Box>
                  <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'block', mb: 0.2 }}>{c.label}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary }}>{c.val}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ p: 3, borderRadius: `${br * 1.5}px`, background: `${palette.primary.main}07`, border: `1px solid ${palette.primary.main}15` }}>
            <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.8, fontWeight: 300 }}>
              You also have the right to lodge a complaint with the{' '}
              <Box component="span" sx={{ color: palette.primary.main, fontWeight: 500 }}>Nigeria Data Protection Bureau (NDPB)</Box>
              {' '}at <Box component="span" sx={{ color: palette.primary.main, fontWeight: 500 }}>ndpb.gov.ng</Box> if you believe your data rights have been violated.
            </Typography>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ fontFamily: typography.fontFamily, overflowX: 'hidden', background: palette.background.paper }}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: heroGradient,
                paddingTop: { xs: 7, md: 8 },
        paddingBottom: { xs: 12, md: 20 },
        overflow: 'hidden',
      }}>
        {[
          { size: 620, top: -190, right: -190 },
          { size: 420, bottom: -130, left: -130 },
          { size: 260, top: '28%', left: '44%' },
        ].map((b, i) => (
          <Box key={i} sx={{ position: 'absolute', width: b.size, height: b.size, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.09), transparent 70%)', top: b.top, bottom: b.bottom, right: b.right, left: b.left, pointerEvents: 'none' }} />
        ))}
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`, backgroundSize: '200px', opacity: 0.6 }} />
        {[...Array(7)].map((_, i) => (
          <Box key={i} sx={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', top: `${12 + i * 11}%`, right: `${5 + (i % 3) * 5}%`, animation: `dot${i} ${3 + i * 0.35}s ease-in-out ${i * 0.3}s infinite`, [`@keyframes dot${i}`]: { '0%,100%': { opacity: 0.2, transform: 'scale(1)' }, '50%': { opacity: 1, transform: 'scale(1.5)' } } }} />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 1, border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.08)' }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: palette.secondary.light, boxShadow: `0 0 8px ${palette.secondary.light}`, animation: 'blink 2.5s ease infinite', '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.88)', letterSpacing: '0.06em', fontWeight: 500 }}>Your Privacy Matters · NDPR Compliant</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '55fr 45fr' }, gap: { xs: 6, md: 10 }, alignItems: 'center' }}>
            <Box sx={{ animation: 'heroUp 1s cubic-bezier(0.22,1,0.36,1) forwards', '@keyframes heroUp': { from: { opacity: 0, transform: 'translateY(36px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
              <Typography variant="h1" sx={{ color: '#fff', fontSize: { xs: '3rem', sm: '3.8rem', md: '4.8rem' }, lineHeight: 1.1, mb: 3 }}>
                Privacy<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9, ${palette.secondary.main})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Policy
                </Box>
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.68)', mb: 5, maxWidth: 480, fontWeight: 300 }}>
                We are committed to protecting your personal information and being fully transparent about how we collect, use, and safeguard your data.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {['NDPR 2019 Compliant', 'Zero Data Selling', 'AES-256 Encrypted'].map((pill, i) => (
                  <Box key={i} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 2, py: 0.75, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '100px' }}>
                    <CheckIcon sx={{ fontSize: 13, color: palette.secondary.light }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500, fontFamily: typography.fontFamily }}>{pill}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Right: stats grid */}
            <Box sx={{ display: { xs: 'none', md: 'grid' }, gridTemplateColumns: '1fr 1fr', gap: 2, animation: 'heroRight 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s forwards', opacity: 0, '@keyframes heroRight': { from: { opacity: 0, transform: 'translateX(24px)' }, to: { opacity: 1, transform: 'translateX(0)' } } }}>
              {quickStats.map((s, i) => (
                <Box key={i} sx={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: `${br * 2}px`, p: 2.5, transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)', '&:hover': { background: 'rgba(255,255,255,0.18)', transform: 'translateY(-4px)' } }}>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '1.5rem', fontWeight: 700, color: '#fff', lineHeight: 1, mb: 0.5 }}>{s.val}</Typography>
                  <Typography variant="caption" sx={{ color: palette.secondary.light, fontWeight: 600, display: 'block', mb: 0.25 }}>{s.label}</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem' }}>{s.sub}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>

        <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: { xs: 50, md: 72 }, background: palette.background.default, clipPath: 'ellipse(58% 100% at 50% 100%)' }} />
      </Box>


      {/* ── OVERVIEW STRIP ────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Box
            ref={overviewRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 5, md: 10 },
              alignItems: 'center',
              opacity: overviewVisible ? 1 : 0,
              transform: overviewVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <Box>
              <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Our Commitment</Typography>
              </Box>
              <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2rem', md: '2.8rem' }, lineHeight: 1.15, mb: 2 }}>
                Built on Trust,<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>Not on Data</Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, lineHeight: 1.9, mb: 3 }}>
                CodeBridge Cooperative processes personal data strictly to serve our members and meet our legal obligations. We will never monetise your data, sell it to advertisers, or share it beyond what is described in this policy.
              </Typography>
              <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.85, fontWeight: 300 }}>
                This policy applies to all personal data collected through our website, member portal, mobile application, and any other interaction you have with CodeBridge Cooperative Society Limited.
              </Typography>
            </Box>

            {/* Compliance badges */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { icon: <GavelIcon sx={{ fontSize: 22 }} />, title: 'NDPR 2019 Compliant', desc: 'Fully aligned with Nigeria Data Protection Regulation 2019 and subsequent amendments.', color: palette.primary.dark, accent: palette.primary.main },
                { icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 22 }} />, title: 'Designated DPO', desc: 'We have appointed a Data Protection Officer responsible for overseeing all privacy matters.', color: palette.info.dark, accent: palette.info.main },
                { icon: <SecurityOutlinedIcon sx={{ fontSize: 22 }} />, title: 'ISO 27001 Aligned', desc: 'Our information security practices are aligned with international best-practice standards.', color: palette.secondary.dark, accent: palette.secondary.main },
              ].map((b, i) => (
                <Box key={i} sx={{
                  display: 'flex', gap: 2.5, p: 3, borderRadius: `${br * 1.5}px`,
                  background: palette.background.paper,
                  border: `1px solid ${palette.background.default}`,
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': { transform: 'translateX(6px)', borderColor: `${b.color}20`, boxShadow: `0 8px 28px ${b.color}0a` },
                }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: `${br}px`, flexShrink: 0, background: `${b.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: b.color }}>
                    {b.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, mb: 0.4 }}>{b.title}</Typography>
                    <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.65, display: 'block' }}>{b.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── MAIN CONTENT: STICKY NAV + SECTIONS ──────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box
            ref={contentRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '260px 1fr' },
              gap: { xs: 6, lg: 8 },
              alignItems: 'start',
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* ── STICKY NAV ── */}
            <Box sx={{
              position: { xs: 'static', lg: 'sticky' },
              top: 88,
              display: { xs: 'none', lg: 'block' },
            }}>
              <Box sx={{
                p: 2.5,
                borderRadius: `${br * 2}px`,
                background: palette.background.default,
                border: `1px solid ${palette.background.default}`,
              }}>
                <Typography variant="overline" sx={{ color: palette.text.secondary, display: 'block', px: 1.5, mb: 1.5 }}>
                  Contents
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {sections.map((s) => {
                    const active = activeSection === s.id;
                    return (
                      <Box
                        key={s.id}
                        onClick={() => scrollTo(s.id)}
                        sx={{
                          display: 'flex', alignItems: 'center', gap: 1.25,
                          px: 1.5, py: 1.25,
                          borderRadius: `${br * 1.5}px`,
                          cursor: 'pointer',
                          background: active ? `linear-gradient(135deg, ${palette.primary.main}12, ${palette.primary.dark}08)` : 'transparent',
                          border: `1px solid ${active ? palette.primary.main + '18' : 'transparent'}`,
                          color: active ? palette.primary.main : palette.text.secondary,
                          transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                          '&:hover': { background: `${palette.primary.main}08`, color: palette.primary.main },
                        }}
                      >
                        <Box sx={{ opacity: active ? 1 : 0.6, display: 'flex', alignItems: 'center' }}>
                          {s.icon}
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '0.82rem', fontWeight: active ? 600 : 400, lineHeight: 1.2 }}>
                          {s.label}
                        </Typography>
                        {active && <Box sx={{ ml: 'auto', width: 5, height: 5, borderRadius: '50%', background: palette.primary.main, flexShrink: 0 }} />}
                      </Box>
                    );
                  })}
                </Box>

                {/* DPO quick link */}
                <Box sx={{ mt: 2.5, pt: 2.5, borderTop: `1px solid ${palette.primary.main}10` }}>
                  <Typography variant="caption" sx={{ color: palette.text.secondary, px: 1.5, display: 'block', mb: 1.5 }}>
                    Questions?
                  </Typography>
                  <Box
                    component="a"
                    href="mailto:dpo@codebridgecoop.ng"
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.25,
                      px: 2, py: 1.5,
                      borderRadius: `${br * 1.5}px`,
                      background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                      textDecoration: 'none',
                      transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                      boxShadow: `0 6px 20px ${palette.primary.main}25`,
                      '&:hover': { boxShadow: `0 10px 28px ${palette.primary.main}40`, transform: 'translateY(-1px)' },
                    }}
                  >
                    <ContactMailOutlinedIcon sx={{ fontSize: 16, color: '#fff' }} />
                    <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>
                      Email our DPO
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* ── POLICY SECTIONS ── */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {contentSections.map((sec) => (
                <Box
                  key={sec.id}
                  id={sec.id}
                  ref={(el) => { sectionRefs.current[sec.id] = el as HTMLDivElement | null; }}
                  sx={{
                    p: { xs: 3.5, md: 5 },
                    borderRadius: `${br * 2}px`,
                    background: palette.background.default,
                    border: `1px solid ${palette.background.default}`,
                    position: 'relative', overflow: 'hidden',
                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    '&:hover': { borderColor: `${sec.color}15`, boxShadow: `0 12px 40px ${sec.color}08` },
                    scrollMarginTop: 100,
                  }}
                >
                  {/* Top accent */}
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${sec.color}, ${sec.accent})` }} />
                  <Box sx={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at top right, ${sec.color}06, transparent 70%)`, borderRadius: `0 ${br * 2}px 0 100%` }} />

                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3.5 }}>
                    <Box sx={{
                      width: 50, height: 50, borderRadius: `${br}px`, flexShrink: 0,
                      background: `${sec.color}10`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: sec.color,
                    }}>
                      {sec.icon}
                    </Box>
                    <Typography variant="h4" sx={{ color: palette.text.primary, fontSize: { xs: '1.3rem', md: '1.5rem' } }}>
                      {sec.title}
                    </Typography>
                  </Box>

                  {sec.body}
                </Box>
              ))}

              {/* Effective date footer */}
              <Box sx={{
                p: 4, borderRadius: `${br * 2}px`,
                background: `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})`,
                position: 'relative', overflow: 'hidden',
              }}>
                <Box sx={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.09), transparent 70%)', pointerEvents: 'none' }} />
                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.55)', display: 'block', mb: 1 }}>Effective Date</Typography>
                <Typography variant="h5" sx={{ color: '#fff', mb: 1, fontWeight: 300, fontStyle: 'italic' }}>
                  This policy is effective as of January 15, 2025
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                  By using the CodeBridge platform, you acknowledge that you have read and understood this Privacy Policy. For questions, contact our Data Protection Officer at{' '}
                  <Box component="a" href="mailto:dpo@codebridgecoop.ng" sx={{ color: palette.secondary.light, textDecoration: 'none', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>
                    dpo@codebridgecoop.ng
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── CTA ───────────────────────────────────────────────── */}
      <Box sx={{ position: 'relative', background: heroGradient, py: { xs: 10, md: 14 }, overflow: 'hidden' }}>
        {[{ size: 500, top: -100, right: -100 }, { size: 400, bottom: -100, left: -100 }].map((b, i) => (
          <Box key={i} sx={{ position: 'absolute', width: b.size, height: b.size, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)', top: b.top, bottom: b.bottom, right: b.right, left: b.left, pointerEvents: 'none' }} />
        ))}
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h1" sx={{ color: '#fff', mb: 2, fontSize: { xs: '2.6rem', md: '3.4rem' } }}>
              Your Data,<br />
              <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Your Control
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.62)', mb: 6, maxWidth: 480, mx: 'auto', fontWeight: 300 }}>
              Have a question about your privacy or want to exercise your data rights?
              Our DPO responds within 72 hours.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', mb: 6 }}>
              <Button
                component="a" href="mailto:dpo@codebridgecoop.ng"
                variant="contained" size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ background: '#fff', color: palette.primary.dark, boxShadow: '0 10px 40px rgba(0,0,0,0.22)', '&:hover': { background: palette.background.default, boxShadow: '0 18px 56px rgba(0,0,0,0.28)' } }}
              >
                Email Our DPO
              </Button>
              <Button
                component={Link} to="/contact" variant="outlined" size="large"
                sx={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.07)', '&:hover': { borderColor: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.14)' } }}
              >
                Contact Us
              </Button>
            </Stack>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              Effective January 15, 2025 · Version 2.1 · NDPR Compliant
            </Typography>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default PrivacyPolicy;