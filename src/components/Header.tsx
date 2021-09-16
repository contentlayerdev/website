import { headerConfig } from ".contentlayer/data";

export const Header = () => {
  return (
    <header>
      <ul>
        {headerConfig.nav_links.map((item, idx: number) => {
          return (
            <li key={idx}>
              <a href={item.url}>{item.label}</a>
            </li>
          );
        })}
      </ul>
    </header>
  );
};
