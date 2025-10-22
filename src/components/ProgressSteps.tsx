type Props = { step: number; total: number }
export default function ProgressSteps({ step, total }: Props) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>Step {step} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-brand-600" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
