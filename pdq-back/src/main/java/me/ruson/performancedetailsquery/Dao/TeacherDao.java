package me.ruson.performancedetailsquery.Dao;

import me.ruson.performancedetailsquery.Enity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public interface TeacherDao extends JpaRepository<Teacher,Integer> {
    Teacher getAllByStaffCodeAndIdCardLike(String staffCode, String id_card);
    @Transactional
    @Modifying
    @Query(value = "truncate table teacher",nativeQuery = true)
    void truncateTable();
}

