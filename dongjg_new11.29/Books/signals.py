from django.db.models.signals import post_save
from django.dispatch import receiver

from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from .models import Profile
from .models import MapTeacher
@receiver(post_save, sender= User)
def create_profile(sender, instance, created, **kwargs):
    
    if created:
        Profile.objects.create(user=instance)
        print('Profile created')

# post_save.connect(create_profile, sender=User)    
@receiver(post_save, sender= User)
def update_profile(sender, instance, created, **kwargs):
    
    if created == False:
        instance.profile.save()
        print('Profile updated!')
        # print()
        # try:
        #     instance.profile.save()
        #     print('Profile updated!')
        # except:
        #     Profile.objects.create(user = instance)
        #     print('Profile create for existing user!')
# post_save.connect(update_profile, sender=User) 

def mapteacher_profile(sender, instance, created, **kwargs):
    
    if created:
        group = Group.objects.get(name = 'customer')
        instance.group.add(group)

        MapTeacher.objects.create(
            user=instance,
            teacher_name = instance.username
        )
        print('Profile Created!')
post_save.connect(mapteacher_profile, sender=User) 
