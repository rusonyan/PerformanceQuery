package me.ruson.performancedetailsquery.Controller;

import me.ruson.performancedetailsquery.Dao.PdqDao;
import me.ruson.performancedetailsquery.Dao.TeacherDao;
import me.ruson.performancedetailsquery.Dao.TypeDao;
import me.ruson.performancedetailsquery.Enity.Pdq;
import me.ruson.performancedetailsquery.Enity.Teacher;
import me.ruson.performancedetailsquery.Enity.Type;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
public class UploadController {
    @Autowired
    private TypeDao typeDao;
    @Autowired
    private PdqDao pdqDao;
    @Autowired
    private TeacherDao teacherDao;

    @PostMapping("/api/upload")
    @ResponseBody
    public String upload(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return "上传失败，请选择文件";
        }
        typeDao.truncateTable();
        pdqDao.truncateTable();
        teacherDao.truncateTable();
        XSSFWorkbook xssfWorkbook = new XSSFWorkbook(file.getInputStream());
        XSSFSheet sheet = xssfWorkbook.getSheetAt(0);
        XSSFRow xssfRow = sheet.getRow(0);
        for (int i = 5; i < xssfRow.getLastCellNum(); i++) {
            XSSFCell cell = xssfRow.getCell(i);
            cell.setCellType(CellType.STRING);
            String cellValue = cell.getStringCellValue();
            if (cellValue.length() == 0) {
                break;
            }
            Type type = new Type();
            type.setTypeName(cellValue);
            typeDao.save(type);
        }
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            XSSFRow xssfRowing = sheet.getRow(i);
            Teacher teacher = new Teacher();
            XSSFCell cell = xssfRowing.getCell(1);
            cell.setCellType(CellType.STRING);
            teacher.setStaffCode(cell.getStringCellValue());

            cell = xssfRowing.getCell(2);
            cell.setCellType(CellType.STRING);
            teacher.setName(cell.getStringCellValue());

            cell = xssfRowing.getCell(3);
            cell.setCellType(CellType.STRING);
            teacher.setDepartment(cell.getStringCellValue());

            cell = xssfRowing.getCell(4);
            cell.setCellType(CellType.STRING);
            teacher.setDepartment(xssfRowing.getCell(3).getStringCellValue());
            String idCard = cell.getStringCellValue();
            if (idCard.length() == 0) {
                return "ok";
            }
            idCard = idCard.substring(idCard.length() - 6);
            teacher.setIdCard(idCard);
            teacherDao.save(teacher);
            for (int j = 5; j < xssfRowing.getLastCellNum(); j++) {
                Pdq pdq = new Pdq();
                pdq.setTeacherId(i);
                pdq.setTypeId(j - 4);
                cell=xssfRowing.getCell(j);
                cell.setCellType(CellType.NUMERIC);
                pdq.setMoney(cell.getNumericCellValue());
                pdqDao.save(pdq);
            }
        }
        return "OK";
    }
}
