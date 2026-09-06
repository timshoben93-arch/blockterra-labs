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
        className="flex h-[100dvh] max-h-[100dvh] w-full max-w-none translate-x-0 translate-y-0 left-0 top-0 rounded-none border-0 p-0 gap-0 overflow-hidden [&>button]:right-3 [&>button]:top-3 [&>button]:inline-flex [&>button]:h-10 [&>button]:w-10 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full sm:left-1/2 sm:top-1/2 sm:h-[min(92dvh,900px)] sm:max-h-[min(92dvh,900px)] sm:w-[min(calc(100%-2rem),48rem)] sm:max-w-[min(calc(100%-2rem),48rem)] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-2xl sm:border"
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
