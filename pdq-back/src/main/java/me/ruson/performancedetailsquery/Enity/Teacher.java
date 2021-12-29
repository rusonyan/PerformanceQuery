package me.ruson.performancedetailsquery.Enity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "Teacher")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    private String staffCode;
    private String name;
    private String department;
    private String idCard;
}
