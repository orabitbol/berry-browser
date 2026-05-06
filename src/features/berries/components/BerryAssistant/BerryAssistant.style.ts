import { styled } from '@mui/material/styles'
import { keyframes } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import { gradients, shadows, zIndex as z, radius, transition } from '@/design-system'

const panelIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.88) translateY(16px)' },
  to: { opacity: 1, transform: 'scale(1) translateY(0)' },
})

const dotBounce = keyframes({
  '0%, 60%, 100%': { transform: 'translateY(0)', opacity: 0.4 },
  '30%': { transform: 'translateY(-5px)', opacity: 1 },
})

const assistantBubbleBg = (theme: Theme) =>
  theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.background.default

const avatarBase = {
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  userSelect: 'none' as const,
}

export const ChatFab = styled('button')(({ theme }) => ({
  position: 'fixed',
  bottom: 24,
  right: 24,
  width: 56,
  height: 56,
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: gradients.purple(theme.palette.mode),
  color: '#fff',
  boxShadow: shadows.fab(theme.palette.mode),
  zIndex: z.fab,
  transition: `transform ${transition.normal}, box-shadow ${transition.normal}`,
  '&:hover': {
    transform: 'scale(1.08)',
    boxShadow: shadows.fabHover(theme.palette.mode),
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: 3,
  },
}))

export const ChatPanel = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 92,
  right: 24,
  width: 360,
  maxHeight: 600,
  borderRadius: radius.xl,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  zIndex: z.assistant,
  animation: `${panelIn} 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)`,
  backgroundColor: theme.palette.background.paper,
  boxShadow: shadows.panel(theme.palette.mode),
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100vw - 32px)',
    right: 16,
    bottom: 88,
  },
}))

export const PanelHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 12px 14px 16px',
  background: gradients.purpleSubtle(theme.palette.mode),
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
}))

export const HeaderAvatar = styled(Box)(({ theme }) => ({
  ...avatarBase,
  width: 36,
  height: 36,
  background: gradients.purple(theme.palette.mode),
  fontSize: '1.05rem',
}))

export const HeaderInfo = styled(Box)({
  flex: 1,
  minWidth: 0,
})

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '0.875rem',
  color: theme.palette.text.primary,
  lineHeight: 1.2,
}))

export const HeaderSub = styled(Typography)(({ theme }) => ({
  fontSize: '0.68rem',
  color: theme.palette.text.secondary,
  fontWeight: 400,
}))

export const HeaderClose = styled('button')(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  color: theme.palette.text.secondary,
  flexShrink: 0,
  padding: 0,
  transition: `background-color ${transition.fast}, color ${transition.fast}`,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
    color: theme.palette.text.primary,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}))

export const PanelBody = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: '16px 14px 8px',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.palette.divider} transparent`,
  '&::-webkit-scrollbar': { width: 4 },
  '&::-webkit-scrollbar-track': { background: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider,
    borderRadius: 4,
  },
}))

export const MessageRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser: boolean }>(({ isUser }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 8,
  flexDirection: isUser ? 'row-reverse' : 'row',
}))

export const AssistantAvatarSmall = styled(Box)(({ theme }) => ({
  ...avatarBase,
  width: 26,
  height: 26,
  background: gradients.purple(theme.palette.mode),
  fontSize: '0.82rem',
}))

export const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser: boolean }>(({ isUser, theme }) => ({
  maxWidth: '78%',
  padding: '9px 13px',
  borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
  fontSize: '0.855rem',
  lineHeight: 1.55,
  fontFamily: theme.typography.fontFamily,
  wordBreak: 'break-word',
  ...(isUser
    ? {
        background: gradients.purple(theme.palette.mode),
        color: '#ffffff',
      }
    : {
        backgroundColor: assistantBubbleBg(theme),
        color: theme.palette.text.primary,
      }),
}))

export const TypingBubble = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 5,
  padding: '12px 14px',
  borderRadius: '18px 18px 18px 4px',
  backgroundColor: assistantBubbleBg(theme),
}))

export const TypingDot = styled('span', {
  shouldForwardProp: (prop) => prop !== 'delay',
})<{ delay: number }>(({ delay, theme }) => ({
  width: 7,
  height: 7,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  display: 'block',
  animation: `${dotBounce} 1.2s ease-in-out infinite`,
  animationDelay: `${delay}s`,
}))

export const SuggestionsWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 7,
  padding: '10px 14px 13px',
  borderTop: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
}))

export const SuggestionsLabel = styled(Typography)(({ theme }) => ({
  width: '100%',
  fontSize: '0.65rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
}))

export const MoreIdeasChip = styled('button')(({ theme }) => ({
  padding: '6px 12px',
  borderRadius: 20,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: 'transparent',
  color: theme.palette.text.secondary,
  fontSize: '0.78rem',
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: theme.typography.fontFamily,
  lineHeight: 1.4,
  transition: `background-color ${transition.fast}, color ${transition.fast}`,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    color: theme.palette.text.primary,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}))

export const SuggestionChip = styled('button')(({ theme }) => ({
  padding: '6px 12px',
  borderRadius: 20,
  border: `1px solid ${
    theme.palette.mode === 'dark' ? 'rgba(167,139,250,0.3)' : 'rgba(109,40,217,0.2)'
  }`,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(109,40,217,0.15)' : 'rgba(109,40,217,0.06)',
  color: theme.palette.primary.main,
  fontSize: '0.78rem',
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: theme.typography.fontFamily,
  lineHeight: 1.4,
  transition: `background-color ${transition.fast}, border-color ${transition.fast}, transform ${transition.fast}`,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(109,40,217,0.28)' : 'rgba(109,40,217,0.12)',
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}))

export const InputRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 12px 12px 14px',
  borderTop: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
}))

export const ChatInput = styled('input')(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  border: `1.5px solid ${theme.palette.divider}`,
  borderRadius: 12,
  padding: '9px 14px',
  fontSize: '0.855rem',
  fontFamily: theme.typography.fontFamily,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
  color: theme.palette.text.primary,
  outline: 'none',
  transition: `border-color ${transition.fast}, box-shadow ${transition.fast}`,
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${
      theme.palette.mode === 'dark' ? 'rgba(167,139,250,0.18)' : 'rgba(109,40,217,0.1)'
    }`,
  },
  '&::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 0.75,
  },
}))

export const SendButton = styled('button')(({ theme }) => ({
  width: 38,
  height: 38,
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: gradients.purple(theme.palette.mode),
  color: '#fff',
  flexShrink: 0,
  padding: 0,
  transition: `opacity ${transition.fast}, transform ${transition.fast}`,
  '&:disabled': {
    opacity: 0.35,
    cursor: 'not-allowed',
  },
  '&:not(:disabled):hover': {
    transform: 'scale(1.1)',
  },
  '&:not(:disabled):active': {
    transform: 'scale(0.95)',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}))
