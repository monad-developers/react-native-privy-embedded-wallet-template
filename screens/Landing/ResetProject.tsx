import { Collapsible } from "@/components/Collapsible";
import CollapsibleContentContainer from "@/components/CollapsibleContentContainer";
import { ThemedText } from "@/components/ThemedText";

export default function ResetProject() {
    return <Collapsible title="Reset Project">
    <CollapsibleContentContainer>
      <ThemedText>
        You can switch to the main branch to start fresh.
      </ThemedText>
      <ThemedText type="defaultSemiBold">git checkout main</ThemedText>
    </CollapsibleContentContainer>
  </Collapsible>
}