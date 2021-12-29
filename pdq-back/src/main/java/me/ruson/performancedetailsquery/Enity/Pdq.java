package me.ruson.performancedetailsquery.Enity;

import lombok.Data;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

@Data
@Entity(name = "Pdq")
public class Pdq {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    private Integer teacherId;
    private Integer typeId;
    private Double  money;
}
