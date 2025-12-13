import { ArrowRight, ChevronRight, Laptop, Moon, Sun } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import { sidebarItems } from '~/common/const/sidebar';
import { useAppSearch } from '~/components/context/search-provider';
import { Badge } from '~/components/ui/badge';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/command';
import { ScrollArea } from '~/components/ui/scroll-area';

export function CommandMenu() {
  const { setTheme } = useTheme();
  const { clientId } = useParams<{ clientId: string }>();
  const { push } = useRouter();
  const items = sidebarItems(clientId);
  const { open, setOpen } = useAppSearch();

  const runCommand = useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <ScrollArea type="hover" className="h-72 pe-1">
          <CommandEmpty>No results found.</CommandEmpty>
          {items.map((group) => (
            <CommandGroup key={group.group} heading={group.group}>
              {group.items.map((navItem, i) => {
                // Jika ada submenu
                if (navItem.submenu && navItem.submenu.length > 0) {
                  return navItem.submenu.map((subItem, j) => (
                    <CommandItem
                      key={`${navItem.title}-${subItem.url}-${j}`}
                      value={`${navItem.title}-${subItem.title}`}
                      onSelect={() => runCommand(() => push(subItem.url))}
                    >
                      <div className="flex size-4 items-center justify-center">
                        <ArrowRight className="text-muted-foreground/80 size-2" />
                      </div>
                      {navItem.title} <ChevronRight /> {subItem.title}
                    </CommandItem>
                  ));
                }
                return (
                  <CommandItem
                    key={`${navItem.url}-${i}`}
                    value={navItem.title}
                    onSelect={() => runCommand(() => push(navItem.url))}
                  >
                    <div className="flex size-4 items-center justify-center">
                      {navItem.icon ? (
                        <navItem.icon className="size-3 text-muted-foreground/80" />
                      ) : (
                        <ArrowRight className="size-2 text-muted-foreground/80" />
                      )}
                    </div>
                    {navItem.title}
                    {navItem.badge && (
                      <Badge variant={navItem.badge.variant} className="ml-auto text-xs px-1.5 py-0.5 h-5">
                        {navItem.badge.count}
                      </Badge>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}

          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <Sun /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <Moon className="scale-90" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <Laptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}
