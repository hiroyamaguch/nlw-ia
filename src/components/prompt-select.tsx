import { useEffect, useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select"
import { api } from "@/lib/axios"

interface IPrompt {
  id: string
  value: string
  title: string
  createdAt: string
}

interface PromptSelectProps {
  onPromptSelected: (template: string) => void
}

export const PromptSelect = ({ onPromptSelected }: PromptSelectProps) => {
  const [prompts, setPrompts] = useState<IPrompt[]>([])

  useEffect(() => {
    api.get('prompts').then((response) => {
      setPrompts(response.data)
    })
  }, [])

  function handlePromptSelect(promptId: string) {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

    if (!selectedPrompt) {
      return
    }

    onPromptSelected(selectedPrompt.title)
  }

  return (
    <Select onValueChange={handlePromptSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {prompts.map((prompt) =>
          <SelectItem
            key={prompt.id}
            value={prompt.id}
          >
            {prompt.title}
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  )
}