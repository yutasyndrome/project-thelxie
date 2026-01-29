type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container mx-auto flex-1 p-5">{children}</div>;
};

export default Container;
