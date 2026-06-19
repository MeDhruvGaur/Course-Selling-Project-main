import useAppStore from "../store/appStore";

const ContactPage = () => {
  const { name } = useAppStore();
  return (
    <div>
      ContactPage
      <p>Name: {name}</p>
    </div>
  );
};

export default ContactPage;
