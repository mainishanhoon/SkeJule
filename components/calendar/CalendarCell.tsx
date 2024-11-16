import { cn } from '@/lib/utils';
import {
  CalendarDate,
  getLocalTimeZone,
  isSameMonth,
  isToday,
} from '@internationalized/date';
import { useRef } from 'react';
import { mergeProps, useCalendarCell, useFocusRing } from 'react-aria';
import { CalendarState } from 'react-stately';

export function CalendarCell({
  state,
  date,
  currentMonth,
  isUnavailable,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
  isUnavailable?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref);

  // Override isDisabled if the date is unavailable
  const finalIsDisabled = isDisabled || isUnavailable;

  const { focusProps, isFocusVisible } = useFocusRing();

  const isOutsideMonth = !isSameMonth(currentMonth, date);

  const isDateToday = isToday(date, getLocalTimeZone());

  return (
    <td
      {...cellProps}
      className={`relative px-0.5 py-0.5 ${isFocusVisible ? 'z-10' : 'z-0'}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className="group size-10 rounded-md outline-none sm:size-12"
      >
        <div
          className={cn(
            'flex size-full items-center justify-center rounded-sm text-sm font-semibold',
            finalIsDisabled ? 'cursor-not-allowed text-muted-foreground' : '',
            isFocusVisible ? 'group-focus:z-2 ring-gray-12 ring-offset-1' : '',
            isSelected ? 'bg-primary text-white' : '',
            !isSelected && !finalIsDisabled
              ? 'bg-secondary hover:bg-muted-foreground hover:text-background'
              : '',
          )}
        >
          {formattedDate}
          {isDateToday && (
            <div
              className={cn(
                'absolute bottom-3 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 transform rounded-full bg-primary',
                isSelected && 'bg-white',
              )}
            />
          )}
        </div>
      </div>
    </td>
  );
}
