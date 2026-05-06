import { Fragment, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import { useAppSelector } from '@/store/hooks'
import { selectAllLoadedBerries } from '../../berriesSlice'
import { processQuery } from './assistantLogic'
import {
  GREETING_MESSAGE,
  SUGGESTION_GROUPS,
  GROUP_LABELS,
  type ChatMessage,
} from './assistantTypes'
import {
  AssistantAvatarSmall,
  ChatFab,
  ChatInput,
  ChatPanel,
  HeaderAvatar,
  HeaderClose,
  HeaderInfo,
  HeaderSub,
  HeaderTitle,
  InputRow,
  MessageBubble,
  MessageRow,
  MoreIdeasChip,
  PanelBody,
  PanelHeader,
  SendButton,
  SuggestionChip,
  SuggestionsLabel,
  SuggestionsWrap,
  TypingBubble,
  TypingDot,
} from './BerryAssistant.style'

function parseText(text: string) {
  return text.split('\n').flatMap((line, i, arr) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={`${i}-${j}`}>{part.slice(2, -2)}</strong>
      ) : (
        <Fragment key={`${i}-${j}`}>{part}</Fragment>
      ),
    )
    return i < arr.length - 1 ? [...parts, <br key={`br-${i}`} />] : parts
  })
}

export function BerryAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING_MESSAGE])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [groupIndex, setGroupIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const allBerries = useAppSelector(selectAllLoadedBerries)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    const msgId = idRef.current
    idRef.current += 1

    setMessages((prev) => [...prev, { id: `u-${msgId}`, role: 'user', text: trimmed }])
    setInput('')
    setIsTyping(true)

    timeoutRef.current = setTimeout(() => {
      const response = processQuery(trimmed, allBerries)
      setMessages((prev) => [...prev, { id: `a-${msgId}`, role: 'assistant', text: response }])
      setIsTyping(false)
    }, 650)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(input)
    }
  }

  return (
    <>
      <ChatFab
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close Berry Assistant' : 'Open Berry Assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <CloseRoundedIcon fontSize="small" />
        ) : (
          <AutoAwesomeRoundedIcon fontSize="small" />
        )}
      </ChatFab>

      {isOpen && (
        <ChatPanel role="region" aria-label="Berry Assistant">
          <PanelHeader>
            <HeaderAvatar aria-hidden="true">🍓</HeaderAvatar>
            <HeaderInfo>
              <HeaderTitle>Berry Assistant</HeaderTitle>
              <HeaderSub>Answers from your loaded berry data</HeaderSub>
            </HeaderInfo>
            <HeaderClose onClick={() => setIsOpen(false)} aria-label="Close Berry Assistant">
              <CloseRoundedIcon fontSize="small" />
            </HeaderClose>
          </PanelHeader>

          <PanelBody ref={bodyRef}>
            {messages.map((msg) => (
              <MessageRow key={msg.id} isUser={msg.role === 'user'}>
                {msg.role === 'assistant' && (
                  <AssistantAvatarSmall aria-hidden="true">🍓</AssistantAvatarSmall>
                )}
                <MessageBubble isUser={msg.role === 'user'}>
                  {parseText(msg.text)}
                </MessageBubble>
              </MessageRow>
            ))}

            {isTyping && (
              <MessageRow isUser={false}>
                <AssistantAvatarSmall aria-hidden="true">🍓</AssistantAvatarSmall>
                <TypingBubble>
                  <TypingDot delay={0} />
                  <TypingDot delay={0.2} />
                  <TypingDot delay={0.4} />
                </TypingBubble>
              </MessageRow>
            )}
          </PanelBody>

          {!isTyping && (
            <SuggestionsWrap>
              <SuggestionsLabel>{GROUP_LABELS[groupIndex]}</SuggestionsLabel>
              {SUGGESTION_GROUPS[groupIndex].map((sq) => (
                <SuggestionChip key={sq.query} onClick={() => handleSend(sq.query)}>
                  {sq.label}
                </SuggestionChip>
              ))}
              <MoreIdeasChip
                onClick={() => setGroupIndex((prev) => (prev + 1) % SUGGESTION_GROUPS.length)}
              >
                More ideas →
              </MoreIdeasChip>
            </SuggestionsWrap>
          )}

          <InputRow>
            <ChatInput
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about berries…"
              aria-label="Ask the Berry Assistant"
            />
            <SendButton
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <ArrowUpwardRoundedIcon fontSize="small" />
            </SendButton>
          </InputRow>
        </ChatPanel>
      )}
    </>
  )
}
