'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { ChevronDown, LogOut, Settings, User } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from './ui/button'
import { DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu'

export default function AccountDropDownMenu() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex items-center">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 hover:bg-gray-200 hover:cursor-pointer"
          >
            <Image
              className="h-6 w-6 rounded-full"
              src="https://github.com/nathancamolez-dev.png"
              alt="Profile picture"
              width={24}
              height={24}
            />
            <span className="text-sm">John</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white shadow-lg  w-56 border p-2 rounded-md  z-4 "
        >
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => handleAccountAction('profile')}
            className="cursor-pointer"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleAccountAction('settings')}
            className="cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => handleAccountAction('logout')}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
