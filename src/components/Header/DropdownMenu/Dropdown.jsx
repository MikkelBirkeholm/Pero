import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import styles from "../Header.module.scss";

export const Dropdown = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild className={styles.dropdownTrigger}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Z"
        ></path>
      </svg>
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content
        sideOffset={5}
        className={styles.dropdownContent + " box"}
      >
        <DropdownMenu.Group className={styles.dropdown}>
          <DropdownMenu.Item className={styles.item}>
            <Link href="/settings">Settings</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.item}>
            <Link href="/settings">Subscription</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item className={styles.item}>
            <form action="/auth/logout" method="post">
              <button type="submit">Sign Out</button>
            </form>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

{
  /* <DropdownMenu.Sub>
  <DropdownMenu.SubTrigger />
  <DropdownMenu.Portal>
    <DropdownMenu.SubContent />
  </DropdownMenu.Portal>
</DropdownMenu.Sub>; */
}

// <DropdownMenu.RadioGroup>
//   <DropdownMenu.RadioItem>
//     <DropdownMenu.ItemIndicator />
//   </DropdownMenu.RadioItem>
// </DropdownMenu.RadioGroup>;
