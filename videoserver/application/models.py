from django.db import models

# Create your models here.
class Film(models.Model):
    name = models.TextField(
	    default=None,
	    verbose_name='название фильма',
		)
	quality = models.FileField(
        default=720,
        verbose_name='качество',
		)
    
    def __str__(self):
		return self.quality
    
class Meta:
	verbose_name = 'Каталог фильма'