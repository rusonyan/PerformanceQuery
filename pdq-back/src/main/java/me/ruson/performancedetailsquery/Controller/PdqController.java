package me.ruson.performancedetailsquery.Controller;

import lombok.SneakyThrows;
import me.ruson.performancedetailsquery.Dao.PdqDao;
import me.ruson.performancedetailsquery.Dao.TeacherDao;
import me.ruson.performancedetailsquery.Dao.TypeDao;
import me.ruson.performancedetailsquery.Enity.Pdq;
import me.ruson.performancedetailsquery.Enity.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
@ResponseBody
public class PdqController {
    @Autowired
    TeacherDao teacherDao;
    @Autowired
    TypeDao typeDao;
    @Autowired
    PdqDao pdqDao;

    @GetMapping("/api/teacher")
    public Teacher getTeacher(@RequestParam String staffCode, @RequestParam String idCard) throws Exception {
        Teacher teacher= teacherDao.getAllByStaffCodeAndIdCardLike(staffCode,idCard);
        if (teacher==null)
        {
            throw new Exception("职工号或身份证号错误");
        }
        return teacher;
    }

    @GetMapping("/api/pdq")
    public List<Object[]> getPdq(@RequestParam String staffCode, @RequestParam String idCard)
    {
       Teacher teacer= teacherDao.getAllByStaffCodeAndIdCardLike(staffCode,idCard);
       return pdqDao.getPdq(teacer.getId());
    }
}
