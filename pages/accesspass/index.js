import { getAccessPass } from "../../actions/sale.js";
import AccessPassCard from "../../components/AccessPassCard/AccessPassCard";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

const AccessPassPage = ({ data }) => {
  const router = useRouter();

  const { details, accessPasses } = data;
  const [filtered, setFiltered] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const { t } = router.query;
    setToken(t);
  }, [router]);

  const filter = () => {
    //get ticketNames
    const ticketNames = data.accessPasses.map((item) => {
      return item.ticketId.name;
    });

    const utn = [...new Set(ticketNames)];

    const filteredTickets = utn.map((name) => {
      return {
        name: name,
        accessPass: data.accessPasses.filter((ap) => ap.ticketId.name === name),
      };
    });

    setFiltered(filteredTickets);
  };

  const showFiltered = (aps) => {
    return filtered.map((f, i) => {
      return (
        <div className="filtered-container" key={i}>
          <div className="name-header ff-m text-white">{f.name}</div>
          <div className="access-pass-container d-flex">
            {showAccessPass(f.accessPass)}
          </div>
        </div>
      );
    });
  };

  const showAccessPass = (ap) => {
    return ap.map((item, index) => {
      return <AccessPassCard data={item} index={index + 1} key={index} />;
    });
  };

  const showSingle = () => {
    if (token) {
      const SingleTicket = accessPasses.filter((ap) => ap.accessToken == token);

      if (SingleTicket.length == 1) {
        const st = SingleTicket[0];
        return <AccessPassCard data={st} classNames="shared" index="1" />;
      }
    }
  };

  useEffect(() => {
    filter();
  }, []);

  return (
    <div className="access-pass-page">
      <h1 className="text-center pt-4 text-white ff-so">
        Hello, {details.customerName}
      </h1>

      <h2 className="text-center text-uppercase text-white label ff-g mb-4">
        Your Star City Access Pass
      </h2>

      {token ? showSingle() : showFiltered()}

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps({ query }) {
  const { s, r } = query;
  const data = await getAccessPass(s, r);

  //get tickets to filter

  // Pass data to the page via props
  return { props: { data } };
}

export default AccessPassPage;
