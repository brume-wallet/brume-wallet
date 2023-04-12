import { useBooleanState } from "@/libs/react/handles/boolean";
import { useAsyncUniqueCallback } from "../react/callback";

export function useCopy(text?: string) {
  const { current, enable, disable } = useBooleanState()

  const { run } = useAsyncUniqueCallback(async () => {
    if (!text) return

    await navigator.clipboard.writeText(text)
    enable()
    setTimeout(() => disable(), 600)
  }, [text])

  return { current, run }
}