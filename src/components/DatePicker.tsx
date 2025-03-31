
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  label: string;
}

export function DatePicker({ date, setDate, label }: DatePickerProps) {
  // Add state to control the open/close state of the popover
  const [open, setOpen] = React.useState(false);

  // Handle date selection and close the popover
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setOpen(false); // Close the popover after selection
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full flex justify-start text-left font-normal bg-gaming-darker/70 border-gaming-accent/30 hover:border-gaming-accent/70 hover:bg-gaming-darker/90",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            captionLayout="dropdown-buttons" // Enable year/month dropdown
            fromYear={2000}
            toYear={2030}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
