package me.ruson.performancedetailsquery.Dao;

import me.ruson.performancedetailsquery.Enity.Pdq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PdqDao extends JpaRepository<Pdq,Integer> {
    @Transactional
    @Modifying
    @Query(value = "truncate table pdq",nativeQuery = true)
    void truncateTable();
    @Query(value = "select Pdq.id,money,type_name from pdq,type where teacher_id=?1 and pdq.type_id=type.id order by money DESC;",nativeQuery = true)
    List<Object[]> getPdq(Integer id);
}
