'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface ComboboxDemoProps {
  name: string
  required: boolean
  optionsAvailable: string[]
  onOptionSelect?: (option: string) => void
}

export default function ComboboxDemo({
  name,
  optionsAvailable,
  required,
  onOptionSelect,
}: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const [touched, setTouched] = React.useState(false)

  const options = optionsAvailable.map(option => ({
    value: option.toLowerCase().replace(/\s+/g, '-'),
    label: option,
  }))

  const showError = required && touched && !value
  const errorMessage = `Por favor selecione um modelo do ${name}`

  return (
    <div className="mt-8">
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {name} Options
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  'w-full justify-between',
                  showError && 'border-red-500 focus:ring-red-500'
                )}
                onBlur={() => setTouched(true)}
              >
                {value
                  ? options.find(option => option.value === value)?.label
                  : `Select ${name} option...`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={`Search ${name} options...`} />
                <CommandList>
                  <CommandEmpty>Nenhuma {name} opção encontrada.</CommandEmpty>
                  <CommandGroup>
                    {options.map(option => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={currentValue => {
                          const newValue =
                            currentValue === value ? '' : currentValue
                          setValue(newValue)
                          setOpen(false)
                          if (onOptionSelect && newValue) {
                            const selectedOption = options.find(
                              opt => opt.value === newValue
                            )
                            if (selectedOption) {
                              onOptionSelect(selectedOption.label)
                            }
                          }
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === option.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {showError && (
            <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
          )}
        </div>

        {value && (
          <div className="text-sm text-muted-foreground">
            Selecionado:{' '}
            <span className="font-medium">
              {options.find(option => option.value === value)?.label}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
