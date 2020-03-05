--
-- Dumping data for table `bldgdir_setting`
--

UPDATE `bldgdir_setting` SET `value`='L' WHERE `setting_id`='100';


--
-- Dumping data for table `bldgdir_company`
--

UPDATE `bldgdir_company` SET `lift_bank`='R' WHERE 1;
UPDATE `bldgdir_company` SET `lift_bank`='F' WHERE `company_id` in (102, 103, 104);
