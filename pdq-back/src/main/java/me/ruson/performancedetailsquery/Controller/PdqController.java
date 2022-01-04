package me.ruson.performancedetailsquery.Controller;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import me.ruson.performancedetailsquery.AOP.Response.ResultData;
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
@Slf4j
public class PdqController {
    @Autowired
    TeacherDao teacherDao;
    @Autowired
    TypeDao typeDao;
    @Autowired
    PdqDao pdqDao;

    @GetMapping("/api/teacher")
    public ResultData getTeacher(@RequestParam String staffCode, @RequestParam String idCard) throws Exception {
        Teacher teacher= teacherDao.getAllByStaffCodeAndIdCardLike(staffCode,idCard);
        if (teacher==null)
        {
            log.info(String.format("%s ,%s ",staffCode,idCard));
            return ResultData.fail("职工号或身份证号错误");
        }
        log.info(String.format("%s ,%s ,%s",staffCode,idCard,teacher.getName()));
        return ResultData.success(teacher);
    }

    @GetMapping("/api/pdq")
    public List<Object[]> getPdq(@RequestParam String staffCode, @RequestParam String idCard)
    {
       Teacher teacher= teacherDao.getAllByStaffCodeAndIdCardLike(staffCode,idCard);
       return pdqDao.getPdq(teacher.getId());
    }
}
