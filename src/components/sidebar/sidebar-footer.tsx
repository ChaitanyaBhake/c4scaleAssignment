import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';

export function SidebarFooter() {
  return (
    <div className="border-t dark:border-gray-700 p-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-64"
          align="start"
          side="top"
        >
          <div className="space-y-3">
            <h4 className="font-medium">Appearance</h4>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm">Theme</span>
              <ThemeToggle />
            </div>
            <Separator />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
