type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container mx-auto flex-1 px-5 py-5">{children}</div>;
};

export default Container;
