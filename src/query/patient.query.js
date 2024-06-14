const query = {
    SELECT_PATIENTS:'SELECT * FROM patients ORDER BY CREATED_AT DESC LIMIT 100',
    SELECT_PATIENT:'SELECT * FROM patients  WHERE id = ?',
    CREATE_PATIENTS:'INSERT INTO patients (first_name, last_name, email, address, diagnosis, phone, image_url) VALUE (?, ?, ?, ?, ?, ?, ?)',
    UPDATE_PATIENT:'UPDATE patients first_name = ?, last_name = ?, email = ?, address = ?, diagnosis = ?, phone = ?, image_url = ? Where id = ?',
    DELETE_PATIENT:'DELETE FROM patients WHERE ID = ?',
}

export default query;