type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="container mx-auto flex-1 px-5 pt-24 pb-10">{children}</div>
  );
};

export default Container;
