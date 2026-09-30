import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApplicationForm } from "@/components/talent/ApplicationForm";
import type { Talent } from "@/data/talents";

type ApplyDialogProps = {
  talent: Talent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ApplyDialog = ({ talent, open, onOpenChange }: ApplyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex h-auto max-h-[min(92dvh,44rem)] w-[min(calc(100%-1.5rem),36rem)] max-w-[min(calc(100%-1.5rem),36rem)] flex-col gap-0 overflow-hidden rounded-2xl p-0 sm:max-h-[min(92dvh,42rem)] sm:w-[min(calc(100%-2rem),40rem)] sm:max-w-[min(calc(100%-2rem),40rem)] [&>button]:right-3 [&>button]:top-3 [&>button]:inline-flex [&>button]:h-10 [&>button]:w-10 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-hidden">
          <div className="shrink-0 border-b border-border/60 px-4 pr-14 py-4 sm:px-6">
            <DialogTitle className="text-base sm:text-lg font-display font-bold tracking-tight">
              Application
            </DialogTitle>
            <DialogDescription className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Apply for {talent.title} without leaving this page.
            </DialogDescription>
          </div>
          <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-5 sm:px-6 sm:py-6">
            <ApplicationForm key={open ? talent.slug : "closed"} talent={talent} onDone={() => onOpenChange(false)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
