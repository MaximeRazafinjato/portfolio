import { useMemo } from 'react'
import { Combobox } from '@/components/ui/combobox'

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
  const yearOptions = useMemo(() => {
    return Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
      const year = (maxYear - i).toString()
      return { value: year, label: year }
    })
  }, [minYear, maxYear])

  const displayValue = getYearFromValue(value || '')

  const handleChange = (year: string) => {
    if (year) {
      onChange(yearToISODate(year))
    }
  }

  return (
    <Combobox
      options={yearOptions}
      value={displayValue}
      onValueChange={handleChange}
      placeholder={placeholder}
      searchPlaceholder="Rechercher..."
      emptyMessage="Aucune année trouvée."
      className={className}
      disabled={disabled}
    />
  )
}
