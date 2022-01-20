import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

const Logo = ({ image }) => {
  return (
    <Link href="/">
      <Image src={image} alt="logo" layout="fill" obejectfit="cover" />
    </Link>
  );
};

Logo.propTypes = {
  image: PropTypes.string,
};

export default Logo;
