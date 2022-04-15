import { ReactElement } from "react";
import AppBarComponent from "../modules/Bar/AppBarComponent";
import MenuComponent from "../modules/Menu/MenuComponent";

interface Props {
  children: ReactElement | ReactElement[];
}
const Layout: React.FC<Props> = (props) => {
  const { children } = props;
  console.log(children);
  return (
    <>
      <AppBarComponent   />
      <MenuComponent children={children} />
    </>
  );
};

export default Layout;
