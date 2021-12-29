package me.ruson.performancedetailsquery.Dao;

import me.ruson.performancedetailsquery.Enity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public interface TypeDao extends JpaRepository<Type,Integer> {
    Type getTypeById(Integer id);
    @Transactional
    @Modifying
    @Query(value = "truncate table type",nativeQuery = true)
    void truncateTable();
}
