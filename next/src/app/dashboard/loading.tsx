import { SecondaryHeader } from "@/components/SecondaryHeader"
import { SectionLabel } from "@/components/UI/SectionLabel"

export default function Loading() {
  return (
    <div>
      <SecondaryHeader>
      </SecondaryHeader>
      <div style={{padding: 20}}>
        <SectionLabel label='Today' style={{marginBottom: 162}}/>
        <SectionLabel label='This Week' />
      </div>
    </div>
  )
}