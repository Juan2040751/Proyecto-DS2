from django.db import models


# Create your models here.

class Producto(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.IntegerField()
    manufacturer = models.CharField(max_length=150)
    weight = models.DecimalField(max_digits=20, decimal_places=5)
    category = models.TextField(blank=True)
    numberUnits = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    
    def __str__(self):
        return f"{self.name}"