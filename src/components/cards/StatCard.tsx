import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
  /** Accent color for gradient (defaults to a lighter shade of color) */
  accent?: string;
  /** Trend text shown in bottom pill e.g. "+8.3% this month" */
  trend?: string;
  /** Whether trend is positive (green up arrow) or negative (red down arrow) */
  trendUp?: boolean;
  /** Optional click handler */
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  accent,
  trend,
  trendUp = true,
  onClick,
}) => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;

  // Resolve color — fall back to palette.primary.main if nothing passed
  const resolvedColor = color || palette.primary.main;
  const resolvedAccent = accent || palette.primary.light;

  return (
    <Box
      onClick={onClick}
      sx={{
        p: { xs: 2.5, md: 3.5 },
        borderRadius: `${br * 2}px`,
        background: palette.background.paper,
        border: `1px solid ${palette.background.default}`,
        boxShadow: '0 4px 28px rgba(0,0,0,0.05)',
        position: 'relative', overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
        height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: `0 20px 52px ${resolvedColor}14`,
          borderColor: 'transparent',
          '& .sc-icon': {
            background: `linear-gradient(135deg, ${resolvedColor}, ${resolvedAccent})`,
            color: '#fff',
          },
        },
      }}
    >
      {/* Top accent bar */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${resolvedColor}, ${resolvedAccent})`,
      }} />

      {/* Corner radial tint */}
      <Box sx={{
        position: 'absolute', top: 0, right: 0, width: 80, height: 80,
        background: `radial-gradient(circle at top right, ${resolvedColor}09, transparent 70%)`,
        borderRadius: `0 ${br * 2}px 0 100%`,
        pointerEvents: 'none',
      }} />

      {/* Header row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography
          variant="overline"
          sx={{
            color: palette.text.secondary,
            fontSize: '0.65rem',
            lineHeight: 1.4,
            letterSpacing: '0.07em',
            maxWidth: '70%',
          }}
        >
          {title}
        </Typography>

        {icon && (
          <Box
            className="sc-icon"
            sx={{
              width: 38, height: 38, borderRadius: `${br - 2}px`, flexShrink: 0,
              background: `${resolvedColor}10`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: resolvedColor,
              transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
              '& .MuiSvgIcon-root': { fontSize: 20 },
            }}
          >
            {icon}
          </Box>
        )}
      </Box>

      {/* Value */}
      <Typography
        sx={{
          fontFamily: typography.fontFamily,
          fontWeight: 700,
          fontSize: { xs: '1.4rem', md: '1.65rem' },
          color: palette.text.primary,
          lineHeight: 1,
          mb: 0.5,
          letterSpacing: '-0.01em',
        }}
      >
        {value}
      </Typography>

      {/* Subtitle */}
      {subtitle && (
        <Typography
          variant="caption"
          sx={{
            color: palette.text.secondary,
            fontSize: '0.75rem',
            display: 'block',
            mb: trend ? 2 : 0,
          }}
        >
          {subtitle}
        </Typography>
      )}

      {/* Trend pill */}
      {trend && (
        <Box
          sx={{
            display: 'inline-flex', alignItems: 'center', gap: 0.5,
            px: 1.25, py: 0.3, mt: subtitle ? 0 : 1.5,
            background: trendUp ? `${resolvedColor}0a` : `${palette.error?.main || '#D32F2F'}0a`,
            border: `1px solid ${trendUp ? resolvedColor : palette.error?.main || '#D32F2F'}18`,
            borderRadius: '100px',
            width: 'fit-content',
          }}
        >
          {trendUp
            ? <ArrowUpwardIcon sx={{ fontSize: 10, color: resolvedColor }} />
            : <ArrowDownwardIcon sx={{ fontSize: 10, color: palette.error?.main || '#D32F2F' }} />}
          <Typography
            variant="caption"
            sx={{
              color: trendUp ? resolvedColor : palette.error?.main || '#D32F2F',
              fontWeight: 600,
              fontSize: '0.68rem',
              fontFamily: typography.fontFamily,
            }}
          >
            {trend}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default StatCard;