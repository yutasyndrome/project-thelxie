type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container mx-auto flex-1 p-4 lg:p-8">{children}</div>;
};

export default Container;
