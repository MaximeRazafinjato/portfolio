import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface YearPickerProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  minYear?: number
  maxYear?: number
}

const currentYear = new Date().getFullYear()

function getYearFromValue(value: string): string {
  if (!value) return ''
  if (value.includes('T')) {
    return new Date(value).getFullYear().toString()
  }
  return value
}

function yearToISODate(year: string): string {
  return `${year}-01-01T00:00:00+00:00`
}

export function YearPicker({
  value,
  onChange,
  placeholder = 'Année',
  disabled = false,
  className,
  minYear = 1990,
  maxYear = currentYear + 5,
}: YearPickerProps) {
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i)
  const displayValue = getYearFromValue(value || '')

  const handleChange = (year: string) => {
    onChange(yearToISODate(year))
  }

  return (
    <Select value={displayValue} onValueChange={handleChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
