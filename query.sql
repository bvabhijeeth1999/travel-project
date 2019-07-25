DELIMITER //
CREATE PROCEDURE insertintobookings
BEGIN
  INSERT INTO bookings VALUES(doj,nos,bus_id,username);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE insertintousers
BEGIN
  INSERT INTO users VALUES(name,password,email,dob,balance);
END //
DELIMITER ;
