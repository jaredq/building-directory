--
-- Dumping data for table `bldgdir_setting`
--

UPDATE `bldgdir_setting` SET `value`='R' WHERE `setting_id`='100';


--
-- Dumping data for table `bldgdir_company`
--

UPDATE `bldgdir_company` SET `lift_bank`='L' WHERE 1;
UPDATE `bldgdir_company` SET `lift_bank`='F' WHERE `company_id` in (100, 101);
