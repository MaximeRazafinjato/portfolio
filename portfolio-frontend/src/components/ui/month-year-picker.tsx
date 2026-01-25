import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Combobox } from '@/components/ui/combobox'

interface MonthYearPickerProps {
  value?: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
  minYear?: number
  maxYear?: number
}

const MONTHS = [
  { value: '01', label: 'Janvier' },
  { value: '02', label: 'Février' },
  { value: '03', label: 'Mars' },
  { value: '04', label: 'Avril' },
  { value: '05', label: 'Mai' },
  { value: '06', label: 'Juin' },
  { value: '07', label: 'Juillet' },
  { value: '08', label: 'Août' },
  { value: '09', label: 'Septembre' },
  { value: '10', label: 'Octobre' },
  { value: '11', label: 'Novembre' },
  { value: '12', label: 'Décembre' },
]

const currentYear = new Date().getFullYear()

function parseMonthYear(value: string): { month: string; year: string } {
  if (!value) return { month: '', year: '' }

  if (value.includes('T')) {
    const date = new Date(value)
    return {
      month: String(date.getMonth() + 1).padStart(2, '0'),
      year: date.getFullYear().toString(),
    }
  }

  const parts = value.split('-')
  if (parts.length >= 2) {
    return { year: parts[0], month: parts[1] }
  }

  return { month: '', year: '' }
}

function toISODate(year: string, month: string): string {
  return `${year}-${month}-01T00:00:00+00:00`
}

export function MonthYearPicker({
  value,
  onChange,
  disabled = false,
  className,
  minYear = 1990,
  maxYear = currentYear + 5,
}: MonthYearPickerProps) {
  const yearOptions = useMemo(() => {
    return Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
      const year = (maxYear - i).toString()
      return { value: year, label: year }
    })
  }, [minYear, maxYear])

  const { month, year } = parseMonthYear(value || '')

  const handleMonthChange = (newMonth: string) => {
    if (newMonth) {
      const finalYear = year || currentYear.toString()
      onChange(toISODate(finalYear, newMonth))
    }
  }

  const handleYearChange = (newYear: string) => {
    if (newYear) {
      const finalMonth = month || '01'
      onChange(toISODate(newYear, finalMonth))
    }
  }

  return (
    <div className={cn('flex gap-2', className)}>
      <Combobox
        options={MONTHS}
        value={month}
        onValueChange={handleMonthChange}
        placeholder="Mois"
        searchPlaceholder="Rechercher..."
        emptyMessage="Aucun mois trouvé."
        className="flex-1"
        disabled={disabled}
      />
      <Combobox
        options={yearOptions}
        value={year}
        onValueChange={handleYearChange}
        placeholder="Année"
        searchPlaceholder="Rechercher..."
        emptyMessage="Aucune année trouvée."
        className="w-28"
        disabled={disabled}
      />
    </div>
  )
}
