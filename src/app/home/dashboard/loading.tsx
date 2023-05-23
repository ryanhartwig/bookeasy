import { SecondaryHeader } from "@/components/SecondaryHeader"
import { SectionLabel } from "@/components/UI/SectionLabel/SectionLabel"

export default function Loading() {
  return (
    <div>
      <SecondaryHeader>
      </SecondaryHeader>
      <div style={{padding: 20}}>
        <SectionLabel label='Today'/>
        <SectionLabel label='This Week' />
      </div>
    </div>
  )
}