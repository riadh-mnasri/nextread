package com.riadh.nextread.service;

import com.riadh.nextread.model.Category;
import com.riadh.nextread.model.Settings;
import com.riadh.nextread.repository.SettingsRepository;
import org.springframework.stereotype.Service;

@Service
public class SettingsService {

    private final SettingsRepository settingsRepository;

    public SettingsService(SettingsRepository settingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    public Settings get() {
        return settingsRepository.findById(1L).orElseGet(() -> {
            Settings settings = new Settings();
            settings.setId(1L);
            return settingsRepository.save(settings);
        });
    }

    public Settings updateFocus(Category category) {
        Settings settings = get();
        settings.setCurrentFocusCategory(category);
        return settingsRepository.save(settings);
    }
}
