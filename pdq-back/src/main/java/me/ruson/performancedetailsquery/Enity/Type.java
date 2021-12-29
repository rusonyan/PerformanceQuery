package me.ruson.performancedetailsquery.Enity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "Type")
public class Type {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    private String typeName;
}
