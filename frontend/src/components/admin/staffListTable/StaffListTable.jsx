import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./StaffListTable.module.css";

function StaffListTable() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchAllStaff = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/staff`
        );
        setStaff(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllStaff();
  }, []);

  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr className={styles.trStyle}>
          <th className={styles.theadRow}>Nom</th>
          <th className={styles.theadRow}>Prénom</th>
          <th className={styles.theadRow}>Rôle</th>
          <th className={styles.theadRow}>Email</th>
          <th className={styles.theadRow}>Détails</th>
        </tr>
      </thead>
      <tbody>
        {staff.map((staffMember) => (
          <tr className={styles.bodyRows} key={staffMember.id}>
            <td className={styles.rows}>{staffMember.last_name}</td>
            <td className={styles.rows}>{staffMember.first_name}</td>
            <td className={styles.rows}>{staffMember.roles}</td>
            <td className={styles.rows}>{staffMember.email}</td>
            <td className={styles.rows}>
              <Link to={`/admin/staff/infos/${staffMember.id}`}>
                <FaEye className={styles.eyeIcon} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StaffListTable;
