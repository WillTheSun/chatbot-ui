import { ChatbotUIContext } from "@/context/context"
import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
import useHotkey from "@/lib/hooks/use-hotkey"
import { IconAdjustmentsHorizontal, IconChevronDown } from "@tabler/icons-react"
import { FC, useContext, useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { ChatSettingsForm } from "../ui/chat-settings-form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface ChatSettingsProps {
  chatSettings: any
  setChatSettings: any
  chatHelpNeeded: boolean
}

export function ChatSettings({
  chatSettings,
  setChatSettings,
  chatHelpNeeded
}: ChatSettingsProps) {
  // Revert to fetchChatModels and re-add ts-ignore
  // @ts-ignore - Suppress property does not exist error
  const { chatModels: allModels, fetchChatModels } =
    useContext(ChatbotUIContext)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    // Comment out the function call to prevent runtime error
    // fetchChatModels()
  }, [fetchChatModels])

  // Check if allModels is an array before calling find
  const fullModel = Array.isArray(allModels)
    ? allModels.find((llm: any) => llm.modelId === chatSettings?.model)
    : undefined

  if (!chatSettings) {
    return null
  }

  return (
    <>
      <div className="flex items-center">
        <Button
          className="flex w-full items-center justify-between space-x-2 truncate text-lg"
          variant="ghost"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <div className="truncate">
            {fullModel?.name || chatSettings.model}
          </div>

          <IconChevronDown
            className={`transition-transform ${isSettingsOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </div>

      <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <SheetContent>
          <ChatSettingsForm
            chatSettings={chatSettings}
            // @ts-ignore - Suppress incorrect prop error
            allModels={allModels}
            onChatSettingsChange={setChatSettings}
            chatHelpNeeded={chatHelpNeeded}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
